import { groq } from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  reference,
  category,
  description,
  "imageUrl": image.asset->url,
  benefits
}`
