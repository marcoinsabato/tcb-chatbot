import {
    Book,
    Bot,
    LifeBuoy,
    SquareTerminal,
    SquareUser,
    Triangle,
    BrainCircuit
} from "lucide-react"

import Link from 'next/link'

import { Button } from "@/components/ui/button"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

export default function Sidebar() {
    return (
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground" />
            </Button>
            </div>
            <nav className="grid gap-1 p-2">
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/playground">
                        <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        aria-label="Playground"
                        >
                            <SquareTerminal className="size-5" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Playground
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/rag">
                        <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        aria-label="Rag"
                        >
                            <BrainCircuit className="size-5" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    RAG
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/agent">
                        <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        aria-label="Agent"
                        >
                            <Bot className="size-5" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Agent
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/documents">
                        <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Models"
                        >
                            <Book className="size-5" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Documents
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {/* <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="API"
                    >
                    <Code2 className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    API
                </TooltipContent>
                </Tooltip>
            </TooltipProvider> */}
            {/* <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Settings"
                    >
                    <Settings2 className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Settings
                </TooltipContent>
                </Tooltip>
            </TooltipProvider> */}
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Help"
                    >
                    <LifeBuoy className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Help
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Account"
                    >
                    <SquareUser className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Account
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </nav>
        </aside>
    )
}