'use client';

import {createContext , useState } from "react";

export const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [temperature , setTemperature] = useState(0.7);
    const [models , setModels] = useState([
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4'
    ]);
    const [selectedModel , setSelectedModel] = useState('gpt-4o');
    const [topP, setTopP] = useState(1.0); // 0.1 to 1
    const [presencePenalty, setPresencePenalty] = useState(0); // -2 to 2
    const [frequencyPenalty, setFrequencyPenalty] = useState(0); // -2 to 2
    const [systemMessage, setSystemMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const [userPrompt , setUserPrompt] = useState(''); //


    const resetChat = () => {
        setMessages([]);
        setUserPrompt('');
    }
    
    return (
        <ChatContext.Provider value={{
            models,
            selectedModel,
            setSelectedModel,
            temperature,
            setTemperature,
            topP,
            setTopP,
            presencePenalty,
            setPresencePenalty,
            frequencyPenalty,
            setFrequencyPenalty,
            systemMessage,
            setSystemMessage,
            messages,
            userPrompt,
            setUserPrompt,
            resetChat

        }}>
            {children}
        </ChatContext.Provider>
    );
}