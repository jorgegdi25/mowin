import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'quc3ruz6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Mowin Studio',
  schema,
  plugins: [
    structureTool(),
    visionTool(),
  ],
})
