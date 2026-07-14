import { groq } from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  reference,
  category,
  description,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url,
  benefits
}`

export const singleProductQuery = groq`*[_type == "product" && _id == $id][0] {
  _id,
  name,
  reference,
  category,
  description,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url,
  benefits
}`
