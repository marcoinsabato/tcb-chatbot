'use client'

import  MessageHistory from "@/components/ui/messageHistory"
import  MessageInput from "@/components/ui/messageInput"

import { useContext } from "react";
import { ChatContext } from "@/context/ChatProvider";



export default function Agent() {

    const { userPrompt , setUserPrompt , genAgentResponse , resetChat , messages } = useContext(ChatContext);
    
    return (
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 w-full max-w-5xl">
            
            <MessageHistory 
                messages={messages}
            />

            <MessageInput  
                onSubmit={genAgentResponse}
                onReset={resetChat}
                inputValue={userPrompt}
                onChange={setUserPrompt}
            />

        </div>
    )
}