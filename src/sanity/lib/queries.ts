import { defineQuery } from "next-sanity";

// Fetch All Products

export const allproduct = defineQuery(`
*[_type == "product"]{
  _id,
  title,
  description,
  "productImage": productImage.asset->url,
  price,
  tags,
  discountPercentage,
  isNew
}
`);

// Fetch Four Products

export const fourProduct = defineQuery(
  `
*[_type == "product"][0..3]{
  _id,
  title,
  description,
  "productImage": productImage.asset->url,
  price,
  tags,
  discountPercentage,
  isNew
}`
);

// Fetch Eight Product

export const eightProduct = defineQuery(
  `
*[_type == "product"][0..7]{
  _id,
  title,
  description,
  "productImage": productImage.asset->url,
  price,
  tags,
  discountPercentage,
  isNew
}`
);
