import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';
import { createEmbedding } from '@/lib/openai';


export async function POST(request: NextRequest) {
    const body = await request.json();

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorMessage = await createEmbedding(body.userPrompt);

    const result: Object[] = await prisma.$queryRaw`
        SELECT
        id,
        content,
        1 - (vector <=> ${vectorMessage}::vector) as similarity
        FROM "Embedding"
        WHERE 1 - (vector <=> ${vectorMessage}::vector) > .3
        ORDER BY  similarity DESC
        LIMIT 3;
    `

    const context = result.map((c: any) => c.content);


    let systemMessage = `
        Le informazioni sul contesto sono riportate di seguito.
        ---------------------
        ${context.join('\n')}
        ---------------------
        Date le informazioni sul contesto e non le conoscenze pregresse, rispondere alla domanda dell'utente. Se nel contesto non è presente una risposta, scrivere 'Mi dispiace non posso aiutarti in questo'.
    `;

    const messages = [
        {role : 'system' , content : systemMessage},
        ...body.messages
    ];

    const completion = await client.chat.completions.create({
        model: body.model,
        messages,
        temperature: body.temperature,
        top_p: body.topP,
        presence_penalty: body.presencePenalty,
        frequency_penalty: body.frequencyPenalty
    })

    return NextResponse.json({
        message : completion.choices[0].message
    });
}