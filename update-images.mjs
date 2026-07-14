import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'quc3ruz6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skBvSSTEjt0angmUCe8VpS8ZARVmgITQ6MufXJQo3fdbBBhDOobYnMJLLcBiaCu1tkp5wQLlxU2jIasEdO5g9Ql5J9BR9n066yqe7zfQMgvJzrsJC7bQWQR2cbuCyKpDvFcbheccV3pEWS3wBWEGX9rHAY7gnQ3owwjvJRjziQ9RnjK64mAf'
})

const WOO_API_URL = 'https://mowin-tech.com.co/wp-json/wc/store/products?per_page=100'

async function uploadImageFromUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
    }
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('text/html')) {
      throw new Error(`Invalid image (received HTML). URL might be a 404 page: ${imageUrl}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop() || 'image.png'
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (err) {
    console.error(`    [!] Error subiendo imagen ${imageUrl}:`, err.message)
    return null
  }
}

async function main() {
  console.log('Obteniendo productos de Sanity...')
  const sanityProducts = await client.fetch(`*[_type == "product"]{ _id, name }`)
  
  console.log(`Encontrados ${sanityProducts.length} productos en Sanity.`)
  
  let wooProducts = []
  let page = 1
  while (true) {
    console.log(`Obteniendo página ${page} de WooCommerce...`)
    const res = await fetch(`${WOO_API_URL}&page=${page}`)
    const data = await res.json()
    if (!data || data.length === 0) break
    wooProducts = wooProducts.concat(data)
    page++
  }
  
  console.log(`Encontrados ${wooProducts.length} productos en WooCommerce.`)
  
  for (const woo of wooProducts) {
    const sProduct = sanityProducts.find(p => p.name.trim().toLowerCase() === woo.name.trim().toLowerCase())
    if (!sProduct) {
      console.log(`[!] No se encontró "${woo.name}" en Sanity, saltando...`)
      continue
    }
    
    // We already uploaded image[0] as main image. We want the rest in the gallery.
    // Actually, maybe some products have multiple images. Let's upload images[1..] to gallery.
    // Or if images.length > 0, let's just upload all of them to gallery for completeness!
    if (woo.images && woo.images.length > 1) {
      console.log(`Actualizando galería para: ${sProduct.name} (${woo.images.length - 1} imágenes extra)`)
      const gallery = []
      
      for (let i = 1; i < woo.images.length; i++) {
        const img = woo.images[i]
        const uploaded = await uploadImageFromUrl(img.src)
        if (uploaded) {
          gallery.push(uploaded)
        }
      }
      
      if (gallery.length > 0) {
        await client.patch(sProduct._id)
          .set({ gallery })
          .commit()
        console.log(`  -> Galería actualizada con ${gallery.length} imágenes.`)
      }
    }
  }
  
  console.log('¡Actualización completada!')
}

main().catch(console.error)
