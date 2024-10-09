import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';


export async function POST(request: NextRequest) {
    const { 
        messages, 
        model, 
        temperature, 
        topP, 
        presencePenalty, 
        frequencyPenalty 
    } = await request.json();

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
        model,
        messages: [{ role: 'system', content: messages[0] }, ...messages.slice(1)],
        temperature,
        top_p: topP,
        presence_penalty: presencePenalty,
        frequency_penalty: frequencyPenalty,
    });

    return NextResponse.json({ message: completion.choices[0].message });
}
