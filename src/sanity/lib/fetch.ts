import { createClient } from "next-sanity";

const client = createClient({
    projectId: "n8h2jnz1",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-12-29",
    token: "sk7LxagB6vqxcmSXFq2dKtZsNYC6Ty4tZjMMHuwxsrDuGdWQzI2EYBhMKAewllFK33k9fvTCZgrAjVRHtpx8M1LuNsAI1OZFg9UXPVk5YGIWLGAv1PlFKuConVnUSLHjVjI74uG1pXOJ9hbBZmMrwpvH7imXceBslP91rdxusEcie97SP1zr"
})

// All Product Fetch Sanity

export async function sanityFetch({query, params = {}}: {query: string, params?: any}) {
    return await client.fetch(query, params)
}