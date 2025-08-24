"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [voiceCommands, setVoiceCommands] = useState({
    findRide: true,
    offerRide: true,
    navigation: true,
    emergencyAlert: true,
  })

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript("Find me a ride to San Francisco tomorrow morning")
        setIsListening(false)

        toast({
          title: "Command recognized",
          description: "Searching for rides to San Francisco tomorrow morning.",
        })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isListening])

  const handleToggleListening = () => {
    if (!voiceEnabled) {
      toast({
        title: "Voice commands disabled",
        description: "Please enable voice commands in the settings.",
        variant: "destructive",
      })
      return
    }

    setIsListening(!isListening)

    if (!isListening) {
      setTranscript("")
      toast({
        title: "Listening...",
        description: "Say a command like 'Find me a ride to San Francisco'",
      })
    }
  }

  const handleToggleVoiceEnabled = () => {
    setVoiceEnabled(!voiceEnabled)

    if (isListening && !voiceEnabled) {
      setIsListening(false)
    }

    toast({
      title: voiceEnabled ? "Voice commands disabled" : "Voice commands enabled",
      description: voiceEnabled
        ? "Voice commands have been disabled."
        : "You can now use voice commands with SmartCommuteX.",
    })
  }

  const handleToggleCommand = (command: keyof typeof voiceCommands) => {
    setVoiceCommands({
      ...voiceCommands,
      [command]: !voiceCommands[command],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Commands</CardTitle>
        <CardDescription>Control SmartCommuteX with your voice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-6 text-center">
          <Button
            variant={isListening ? "default" : "outline"}
            size="icon"
            className={`h-16 w-16 rounded-full ${isListening ? "bg-primary text-primary-foreground animate-pulse" : ""}`}
            onClick={handleToggleListening}
            disabled={!voiceEnabled}
          >
            {isListening ? <Mic className="h-8 w-8" /> : <MicOff className="h-8 w-8" />}
          </Button>
          <p className="font-medium">{isListening ? "Listening..." : "Press to speak"}</p>
          {transcript && <div className="mt-2 rounded-lg bg-muted p-3 text-sm">"{transcript}"</div>}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="voice-enabled">Enable voice commands</Label>
              <p className="text-sm text-muted-foreground">Allow SmartCommuteX to listen for voice commands</p>
            </div>
            <Switch id="voice-enabled" checked={voiceEnabled} onCheckedChange={handleToggleVoiceEnabled} />
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium">Available Commands</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="find-ride">Find Ride commands</Label>
                <p className="text-xs text-muted-foreground">"Find me a ride to [destination]"</p>
              </div>
              <Switch
                id="find-ride"
                checked={voiceCommands.findRide}
                onCheckedChange={() => handleToggleCommand("findRide")}
                disabled={!voiceEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offer-ride">Offer Ride commands</Label>
                <p className="text-xs text-muted-foreground">"Offer a ride to [destination]"</p>
              </div>
              <Switch
                id="offer-ride"
                checked={voiceCommands.offerRide}
                onCheckedChange={() => handleToggleCommand("offerRide")}
                disabled={!voiceEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="navigation">Navigation commands</Label>
                <p className="text-xs text-muted-foreground">"Navigate to pickup point"</p>
              </div>
              <Switch
                id="navigation"
                checked={voiceCommands.navigation}
                onCheckedChange={() => handleToggleCommand("navigation")}
                disabled={!voiceEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emergency">Emergency commands</Label>
                <p className="text-xs text-muted-foreground">"Send emergency alert"</p>
              </div>
              <Switch
                id="emergency"
                checked={voiceCommands.emergencyAlert}
                onCheckedChange={() => handleToggleCommand("emergencyAlert")}
                disabled={!voiceEnabled}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              title: "Voice command examples",
              description: "View our documentation for a full list of voice commands.",
            })
          }}
        >
          <Volume2 className="mr-2 h-4 w-4" />
          View All Voice Commands
        </Button>
      </CardFooter>
    </Card>
  )
}
