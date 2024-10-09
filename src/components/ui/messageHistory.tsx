'use client'

import Markdown from 'react-markdown';
import { useEffect , useRef } from "react";

export default function MessageHistory(
    {messages} : {messages : Array<any>}
){

    const messageHistory = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(messageHistory.current){
            messageHistory.current.scrollTop = messageHistory.current.scrollHeight;
        }
    }, [messages])

    return (
        <div className="flex-auto">
            <div ref={messageHistory} className="relative flex h-[73vh] min-h-[50vh] flex-col rounded-xl bg-muted-50 gap-3 pr-2 py-6 overflow-auto">
                {messages && messages.map((message , index) => (
                    message.role == "user" ? 
                    <p className="inline-block whitespace-pre-wrap py-1.5 px-4 rounded-xl text-right" key={index}>{message.content}</p> 
                    : <Markdown className="whitespace-pre-wrap bg-gray-900 py-3 px-4 rounded-xl text-left markdown" key={index}>{message.content}</Markdown>
        
                ))}
            </div>
        </div>
    )
}