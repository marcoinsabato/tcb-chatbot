import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs  from 'fs';
import { revalidatePath } from "next/cache";
import { createEmbedding } from '@/lib/openai';


// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Handles document upload and saving to database
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response with the newly created document
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    // Get the file from the form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Read the file as an array buffer
    const buffer = await file.arrayBuffer();

    // Write the file to the public/uploads directory
    const filePath = `./public/uploads/${file.name}`;
    await fs.promises.writeFile(filePath, new Uint8Array(buffer));

    // Revalidate the / route to update the document list
    revalidatePath("/");

    // Create a new document in the database
    const prisma = new PrismaClient();
    const document = await prisma.document.create({
        data: {
            name: file.name,
            path: filePath,
            fullPath: filePath,
            mimeType: file.type
        }
    });

    // Read the file content
    let fileContent = "";

    switch(file.type) {
        case "application/pdf":
            // TODO Extract text from PDF file
            break;
        case "text/plain":
            fileContent = await fs.promises.readFile(filePath, "utf-8");
            break;
        default:

            break;
    }

    // Split the file content into chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 50
    });

    const chunks = await splitter.createDocuments([fileContent]);

    // Create embeddings for each chunk
    for (const chunk of chunks) {
        const vector = await createEmbedding(chunk.pageContent);

        // Create an embedding for the chunk
        const embedding = await prisma.embedding.create({
            data: {
                content: chunk.pageContent,
                documentId: document.id
            }
        });

        // Update the embedding vector
        await prisma.$executeRaw`UPDATE "Embedding" SET vector = ${vector}::vector WHERE id = ${embedding.id}`;
    }

    // Return the document
    return NextResponse.json(document , { status: 200 });
}



/**
 * Handles the DELETE request to delete a document and its associated embeddings
 * @param request The request object from Next.js
 * @returns A JSON response with the deleted document and its associated embeddings
 */
export async function DELETE(request: Request) {
    const prisma = new PrismaClient();

    // Check if the request body is empty
    if (!request.body) {
        return NextResponse.json({ error: "No document id provided" }, { status: 400 });
    }

    // Get the document id from the request body
    const { documentId } : { documentId : string} = await request.json();

    // Delete all the embeddings associated with the document
    const deletedEmbedding = await prisma.embedding.deleteMany({
        where: {
            documentId: documentId
        }
    })

    // Get the document from the database
    const document = await prisma.document.findUnique({
        where: {
            id: documentId
        }
    })

    // Check if the document exists
    if (!document) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Delete the document file from the file system
    fs.rmSync(document?.path , { force: true });

    // Delete the document from the database
    const deletedDocument = await prisma.document.delete({
        where: {
            id: documentId
        }
    })

    // Return a JSON response with the deleted document and its associated embeddings
    return NextResponse.json({ deletedEmbedding, deletedDocument }, { status: 200 });
}
