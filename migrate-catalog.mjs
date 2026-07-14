import { createClient } from '@sanity/client'

import * as cheerio from 'cheerio'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'quc3ruz6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error("Falta SANITY_API_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token
})

function stripHtml(html) {
  if (!html) return ''
  const $ = cheerio.load(html)
  return $.text().trim()
}

async function uploadImageFromUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = imageUrl.split('/').pop() || 'image.jpg'
    
    const asset = await client.assets.upload('image', buffer, {
      filename
    })
    
    return asset._id
  } catch (err) {
    console.error("Error subiendo imagen:", imageUrl, err.message)
    return null
  }
}

async function migrate() {
  console.log("Iniciando migración de WooCommerce a Sanity...")
  
  let page = 1
  const perPage = 10
  let totalPages = 1
  
  while (page <= totalPages) {
    console.log(`\nFetching página ${page}...`)
    const response = await fetch(`https://mowin-tech.com.co/wp-json/wc/store/products?page=${page}&per_page=${perPage}`)
    
    if (page === 1) {
      totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1', 10)
      console.log(`Total páginas a procesar: ${totalPages}`)
    }
    
    const products = await response.json()
    
    for (const p of products) {
      console.log(`Procesando: ${p.name}`)
      
      const category = p.categories && p.categories.length > 0 ? p.categories[0].name : 'General'
      const description = stripHtml(p.description) || stripHtml(p.short_description) || 'Sin descripción'
      
      let imageRef = null
      if (p.images && p.images.length > 0) {
        console.log(`  Descargando y subiendo imagen: ${p.images[0].src}`)
        imageRef = await uploadImageFromUrl(p.images[0].src)
      }
      
      const doc = {
        _type: 'product',
        name: p.name,
        reference: p.sku || 'N/A',
        description: description,
        category: category,
        benefits: [
          { _key: '1', label: 'Origen', value: 'Nacional' },
          { _key: '2', label: 'Garantía', value: '1 Año' },
          { _key: '3', label: 'Soporte', value: 'Incluido' },
          { _key: '4', label: 'Calidad', value: 'Premium' }
        ]
      }
      
      if (imageRef) {
        doc.image = {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageRef }
        }
      }
      
      try {
        const created = await client.create(doc)
        console.log(`  -> Creado en Sanity con ID: ${created._id}`)
      } catch (err) {
        console.error(`  -> Error creando documento para ${p.name}:`, err.message)
      }
    }
    
    page++
  }
  
  console.log("\n¡Migración finalizada con éxito!")
}

migrate()
