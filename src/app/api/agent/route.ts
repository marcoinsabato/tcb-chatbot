import { NextRequest, NextResponse } from "next/server";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { DallEAPIWrapper } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";


export async function POST(request: NextRequest) {
    const { messages, threadId} = await request.json();

    // Define the tools for the agent to use
    const agentTools = [
        new TavilySearchResults({ maxResults: 3 }),
        new DallEAPIWrapper({
            n: 1, // Default
            model: "dall-e-3", // Default
        })
    ];
    const agentModel = new ChatOpenAI({ temperature: 0 });

    const agentCheckpointer = new MemorySaver();
    const agent = createReactAgent({
        llm: agentModel,
        tools: agentTools,
        checkpointSaver: agentCheckpointer,
    });

    // Now it's time to use!
    const agentFinalState = await agent.invoke(
        { messages: messages },
        { configurable: { thread_id: threadId } },
    );

    console.log("***************")
    console.log("***************")
    console.log({agentFinalState});
    console.log("***************")
    console.log("***************")

    console.log(
        agentFinalState.messages[agentFinalState.messages.length - 1].content,
    );

    return NextResponse.json({
        message : agentFinalState.messages[agentFinalState.messages.length - 1].content
    });
}