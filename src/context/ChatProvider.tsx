'use client';

import {createContext , useState } from "react";

export const ChatContext = createContext<any>(null);

interface Message {
    role : string
    content : string
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [temperature , setTemperature] = useState(0.7);
    const [models , setModels] = useState([
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4'
    ]);
    const [selectedModel , setSelectedModel] = useState('gpt-4o-mini');
    const [topP, setTopP] = useState(1.0); // 0.1 to 1
    const [presencePenalty, setPresencePenalty] = useState(0); // -2 to 2
    const [frequencyPenalty, setFrequencyPenalty] = useState(0); // -2 to 2
    const [messages , setMessages] = useState<Message[]>([]);
    const [userPrompt , setUserPrompt] = useState('');

    const SYSTEM_PROMPT = "Sei un  assistente virtuale che aiuta l'utente ad acquistare. La lista di prodotti e' : Computer da gaming 1200 euro | Computer da lavoro 600 euro | Computer da astronauta 3000 euro. Rispondi in al massimo 20 parole";
    
    const [systemMessage, setSystemMessage] = useState(SYSTEM_PROMPT);


    const resetChat = () => {
        setMessages([]);
        setUserPrompt('');
    }

    /**
     * Send a message to the chat API and update the state
     */
    const sendMessage = async () => {
        // Create a new array with the current messages and the new user message
        const updatedMessages = [...messages, { role: 'user', content: userPrompt }];
        const userMessage = userPrompt;

        // Reset the user prompt
        setUserPrompt('');

        // Update the state with the new messages
        setMessages(updatedMessages);

        // Send the request to the API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: updatedMessages,
                temperature: temperature,
                topP: topP,
                presencePenalty: presencePenalty,
                frequencyPenalty: frequencyPenalty,
                systemMessage: systemMessage,
                userPrompt: userMessage,
            }),
        });

        // Get the response from the API
        const data = await response.json();

        // Update the state with the new message from the API
        setMessages([...updatedMessages, data.message]);


    };
    
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
            resetChat,
            sendMessage

        }}>
            {children}
        </ChatContext.Provider>
    );
}