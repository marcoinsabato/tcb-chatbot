'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

import {
    CornerDownLeft,
    Paperclip,
    Mic,
    RotateCcw
} from "lucide-react"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export default function MessageInput(
    {
        onSubmit,
        onReset,
        inputValue,
        onChange
    }: {
    onSubmit: () => void;
    onReset: () => void;
    inputValue: string;
    onChange: (value: string) => void;
}) {

    return (
        <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
            onSubmit={(e) => {e.preventDefault() ; onSubmit()}}
            onKeyUp={(e) => e.key === 'Enter' && onSubmit()}
            onReset={() => onReset()}
        >
            <Label htmlFor="message" className="sr-only">
            Message
            </Label>
            <Textarea
                id="message"
                value={inputValue}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="reset" variant="ghost" size="icon">
                        <RotateCcw className="size-4" />
                        <span className="sr-only">Reset Chat</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
            </Button>
            </div>
        </form>
    )
}