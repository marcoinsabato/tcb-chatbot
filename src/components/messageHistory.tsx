'use client'

import {useContext} from "react";
import { ChatContext } from "@/context/ChatProvider";
import Markdown from 'react-markdown';
export default function MessageHistory(){

    const { messages } = useContext(ChatContext);

    return (
        <div className="flex-auto">
            <div className="relative flex h-[73vh] min-h-[50vh] flex-col rounded-xl bg-muted-50 gap-3 pr-2 py-6 overflow-auto">
                {messages.map((message , index) => (
                    message.role == "user" ? 
                    <p className="inline-block whitespace-pre-wrap py-1.5 px-4 rounded-xl text-right" key={index}>{message.content}</p> 
                    : <p className="whitespace-pre-wrap bg-gray-900 py-3 px-4 rounded-xl text-left " key={index}>
                        <Markdown>{message.content}</Markdown>
                    </p> 
                ))}
            </div>
        </div>
    )
}