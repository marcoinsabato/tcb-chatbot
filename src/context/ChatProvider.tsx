import {createContext , useState } from "react";

const ChatContext = createContext({});

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [temperature , setTemperature] = useState(0.7);
    
    return (
        <ChatContext.Provider value={{
            temperature
        }}>
            {children}
        </ChatContext.Provider>
    );
}