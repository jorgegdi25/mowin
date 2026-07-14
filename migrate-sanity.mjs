import { createClient } from '@sanity/client'
import fs from 'fs'

// Reemplaza con tus datos reales obtenidos del panel de Sanity (https://sanity.io/manage)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'quc3ruz6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || 'TU_API_TOKEN_CON_PERMISOS_DE_ESCRITURA'

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-07-14'
})

const staticProducts = [
  {
    _type: 'product',
    name: 'Panel Multiplex Systems',
    reference: 'Control Multiplex',
    description: 'Centro de control multiplexado con pantalla LCD y botones retroiluminados. Gestiona múltiples funciones del vehículo desde una sola interfaz, en carcasa de fibra de carbono para máxima durabilidad.',
    benefits: [
      { _key: '1', label: 'Display', value: 'LCD a color' },
      { _key: '2', label: 'Control', value: 'Táctil retroiluminado' },
      { _key: '3', label: 'Carcasa', value: 'Fibra de carbono' },
      { _key: '4', label: 'Red', value: 'Multiplexada' },
    ]
  },
  {
    _type: 'product',
    name: 'Velocímetro Bus Plus',
    reference: 'Serie 7203319 · REV00',
    description: 'Visualización clara y precisa de la velocidad para el conductor. Diseño robusto para las condiciones más exigentes del transporte, con display de alto contraste legible en cualquier luz.',
    benefits: [
      { _key: '1', label: 'Display', value: 'Alto contraste' },
      { _key: '2', label: 'Precisión', value: 'Señal GNSS' },
      { _key: '3', label: 'Carcasa', value: 'Grado vehicular' },
      { _key: '4', label: 'Instalación', value: 'Plug & play' },
    ]
  },
  {
    _type: 'product',
    name: 'Smart Tachograph',
    reference: 'Serie 7200419 · REV02',
    description: 'Tacógrafo inteligente con GNSS y Bluetooth integrados. Registra velocidad, ubicación y eventos del vehículo en tiempo real, en una carcasa compacta de instalación discreta.',
    benefits: [
      { _key: '1', label: 'GNSS', value: 'Tiempo real' },
      { _key: '2', label: 'Conectividad', value: 'Bluetooth' },
      { _key: '3', label: 'Carcasa', value: 'Compacta' },
      { _key: '4', label: 'Instalación', value: 'Empotrable' },
    ]
  },
  {
    _type: 'product',
    name: 'Velocímetro Van',
    reference: 'Serie 7203219',
    description: 'Versión compacta para vehículos livianos. El mismo display de alto contraste en un formato delgado, pensado para tableros con espacio reducido.',
    benefits: [
      { _key: '1', label: 'Display', value: 'Alto contraste' },
      { _key: '2', label: 'Formato', value: 'Compacto' },
      { _key: '3', label: 'Carcasa', value: 'Aluminio' },
      { _key: '4', label: 'Instalación', value: 'Plug & play' },
    ]
  },
  {
    _type: 'product',
    name: 'Velocímetro Bus',
    reference: 'Serie 7200820',
    description: 'Visualización robusta de velocidad para buses de servicio intensivo. Diseño resistente a vibración y a las condiciones exigentes de la operación diaria.',
    benefits: [
      { _key: '1', label: 'Display', value: 'LED rojo' },
      { _key: '2', label: 'Resistencia', value: 'Uso intensivo' },
      { _key: '3', label: 'Carcasa', value: 'Grado vehicular' },
      { _key: '4', label: 'Instalación', value: 'Universal' },
    ]
  }
]

async function migrate() {
  if (projectId === 'tu-project-id' && !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Por favor configura tu projectId, dataset y token en las variables de entorno o en el script.')
    process.exit(1)
  }

  console.log('Iniciando migración...')
  for (const product of staticProducts) {
    try {
      const result = await client.create(product)
      console.log(`Producto creado: ${result.name} (${result._id})`)
    } catch (err) {
      console.error(`Error creando producto ${product.name}:`, err.message)
    }
  }
  console.log('Migración terminada.')
}

migrate()
