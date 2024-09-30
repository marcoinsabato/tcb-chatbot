import fs from 'fs';
import path from 'path';
import { prisma } from '../src/lib/prisma';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createEmbedding } from '../src/lib/openai';



/**
 * Process a file by breaking it into chunks, creating embeddings for each chunk,
 * and then storing those embeddings in the database.
 * @param {string} filePath The path to the file to process
 */
async function processFile(filePath: string): Promise<void> {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 50
    });

    let chunks = await splitter.createDocuments([fileContent]);

    let embeddings = [];

    for (const chunk of chunks) {        
        let vector = await createEmbedding(chunk.pageContent);

        embeddings.push({
            content: chunk.pageContent,
            embedding: vector
        });

        const embedding = await prisma.embedding.create({
            data: {
                content: chunk.pageContent
            }
        })

        console.log(embedding);

        const updatedEmbedding = await prisma.$executeRaw`UPDATE embeddings SET embedding = ${vector}::vector WHERE id = ${embedding.id}`

        console.log(updatedEmbedding);
    }



    // const promises = embeddings.map((chunk, i) =>  
    //     prisma.embedding.create({
    //         data: {
    //             content: chunk.content,
    //         }
    //     }).then((result: any) =>{
    //         console.log(result);
            
    //         prisma.$executeRaw`UPDATE embeddings SET embedding = ${chunk.embedding}::vector WHERE id = ${result.id}`
    //     })
    // );

    // await Promise.all(promises);
}


async function main(): Promise<void> {
    const filesFolderPath: string = path.join(__dirname, 'files');

    const files: string[] = fs.readdirSync(filesFolderPath);

    for (const file of files) {
        const filePath: string = path.join(filesFolderPath, file);
        await processFile(filePath);
    }

}

try {
    main();
} catch (e: any) {
    console.error(e);
    process.exit(1);
} finally {
    prisma.$disconnect();
}