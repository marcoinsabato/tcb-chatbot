import OpenAI from 'openai';


export async function createEmbedding(text: string) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
    })

    return response.data[0].embedding;
}