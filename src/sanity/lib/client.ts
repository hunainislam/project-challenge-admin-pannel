import { createClient } from "next-sanity";

import dotenv from "dotenv"

dotenv.config()
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false, // Use CDN in production
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});