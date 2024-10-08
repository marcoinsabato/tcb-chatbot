'use client'

import Markdown from 'react-markdown';
export default function MessageHistory(
    {messages} : {messages : Array<any>}
){
    return (
        <div className="flex-auto">
            <div className="relative flex h-[73vh] min-h-[50vh] flex-col rounded-xl bg-muted-50 gap-3 pr-2 py-6 overflow-auto">
                {messages && messages.map((message , index) => (
                    message.role == "user" ? 
                    <p className="inline-block whitespace-pre-wrap py-1.5 px-4 rounded-xl text-right" key={index}>{message.content}</p> 
                    : <Markdown className="whitespace-pre-wrap bg-gray-900 py-3 px-4 rounded-xl text-left " key={index}>{message.content}</Markdown>
        
                ))}
            </div>
        </div>
    )
}