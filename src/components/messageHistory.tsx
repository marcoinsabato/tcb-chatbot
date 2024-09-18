'use client'

import {useContext} from "react";
import { ChatContext } from "@/context/ChatProvider";

export default function MessageHistory(){

    const { messages } = useContext(ChatContext);

    return (
        <div className="flex-1 flex flex-col gap-2 pt-5">
            {messages.map((message , index) => (
                message.role == "user" ? 
                <p className="whitespace-pre-wrap border border-gray-300 py-1.5 px-4 rounded-xl text-right" key={index}>{message.content}</p> 
                : <p className="whitespace-pre-wrap border text-indigo-300 border-indigo-300 py-1.5 px-4 rounded-xl text-left" key={index}>{message.content}</p> 
            ))}
        </div>
    )
}