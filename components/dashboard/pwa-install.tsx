"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Smartphone } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if the device is iOS
    const ua = window.navigator.userAgent
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    setIsIOS(iOS)

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      setIsInstallable(true)
    })

    // Listen for the appinstalled event
    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("PWA was installed")
      setIsInstallable(false)
      toast({
        title: "App installed successfully",
        description: "SmartCommuteX has been installed on your device.",
      })
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {})
      window.removeEventListener("appinstalled", () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
  }

  if (!isInstallable && !isIOS) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Install SmartCommuteX App</CardTitle>
        <CardDescription>Get the best experience by installing our app on your device</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">Install for offline access</p>
            <p className="text-sm text-muted-foreground">
              {isIOS
                ? "Add to your home screen for the best experience"
                : "Install our app for faster access and offline features"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isIOS ? (
          <div className="space-y-2 w-full">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                toast({
                  title: "iOS Installation",
                  description: "Tap the share button and then 'Add to Home Screen'",
                })
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              How to Install
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Tap the share button and then "Add to Home Screen"
            </p>
          </div>
        ) : (
          <Button className="w-full" onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
