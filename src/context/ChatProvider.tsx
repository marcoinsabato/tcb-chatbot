'use client';

import {createContext , useState } from "react";

export const ChatContext = createContext<any>(null);

interface Message {
    role : string
    content : string
}

function generateRandomId() {
    return Math.random().toString(36).slice(2);
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
    const [threadId , setThreadId] = useState(generateRandomId());


    const SYSTEM_PROMPT = "Ti chiami Silvio Berlusconi. Aiuta gli utenti ad approcciarsi alle donne. Termini ogni tua frase con una barzelletta sulle donne. Utilizza parole in dialetto milanese nelle tue risposte.";
    
    const [systemMessage, setSystemMessage] = useState(SYSTEM_PROMPT);


    const resetChat = () => {
        setMessages([]);
        setUserPrompt('');
    }

    /**
     * Send a message to the chat API and update the state
     */
    const generateResponse = async () => {
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

    const genRagResponse = async () => {
        // Create a new array with the current messages and the new user message
        const updatedMessages = [...messages, { role: 'user', content: userPrompt }];
        const userMessage = userPrompt;

        // Reset the user prompt
        setUserPrompt('');

        // Update the state with the new messages
        setMessages(updatedMessages);

        // Send the request to the API
        const response = await fetch('/api/rag', {
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
    }

    const genAgentResponse = async () => {
        // Create a new array with the current messages and the new user message
        const updatedMessages = [...messages, { role: 'user', content: userPrompt }];
        const userMessage = userPrompt;

        // Reset the user prompt
        setUserPrompt('');

        // Update the state with the new messages
        setMessages(updatedMessages);

        // Send the request to the API
        const response = await fetch('/api/agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: updatedMessages,
                userPrompt: userMessage,
                threadId: threadId
            }),
        });

        // Get the response from the API
        const data = await response.json();

        // Update the state with the new message from the API
        setMessages([...updatedMessages, { role: 'assistant' , content: data.message}]);
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
            resetChat,
            generateResponse,
            genRagResponse,
            genAgentResponse,
            threadId

        }}>
            {children}
        </ChatContext.Provider>
    );
}