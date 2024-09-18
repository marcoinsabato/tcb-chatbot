'use client';

import {
  BrainCircuit
} from "lucide-react"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea"
import { useContext } from "react";
import { ChatContext } from "@/context/ChatProvider";


export default function ModelSettings() {
  const {
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
  } = useContext(ChatContext)

  return (
      <div
      className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
    >
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Settings
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value)}>
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models && models.map((model: string) => (
                  <SelectItem
                    key={model}
                    value={model}
                    data-description
                  >
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <BrainCircuit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          <span className="font-medium text-foreground">
                            {model}
                          </span>
                        </p>
                      </div>
                    </div>
                  </SelectItem> 
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input value={temperature} onChange={(e) => setTemperature(Number(e.target.value))}  id="temperature" type="number" placeholder="0.4" min="0" max="2" step="0.1"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="topP">Top P</Label>
              <Input value={topP} onChange={(e) => setTopP(Number(e.target.value))}  id="topP" type="number" placeholder="0.4" min="0" max="1" step="0.1"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="presencePenalty">Presence Penalty</Label>
              <Input value={presencePenalty} onChange={(e) => setPresencePenalty(Number(e.target.value))}  id="presencePenalty" type="number" placeholder="1" min="-2" max="2" step="0.1"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
              <Input value={frequencyPenalty} onChange={(e) => setFrequencyPenalty(Number(e.target.value))}  id="frequencyPenalty" type="number" placeholder="1" min="-2" max="2" step="0.1"/>
            </div>

          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            System Message
          </legend>
          {/* <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className="grid gap-3">
            <Label htmlFor="systemMessage">Content</Label>
            <Textarea
              id="systemMessage"
              placeholder="You are a..."
              className="min-h-[9.5rem]"
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}