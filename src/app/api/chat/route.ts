import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';


export async function POST(request: NextRequest) {
    const body = await request.json();

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
        model: body.model,
        messages: body.messages,
        temperature: body.temperature,
        top_p: body.topP,
        presence_penalty: body.presencePenalty,
        frequency_penalty: body.frequencyPenalty
    })

    console.log(completion);

    return NextResponse.json({
        message : completion.choices[0].message
    });
}