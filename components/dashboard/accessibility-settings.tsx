"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accessibility, Eye, Type, ZoomIn } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AccessibilitySettings() {
  const [settings, setSettings] = useState({
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    largeText: false,
  })

  const [fontSize, setFontSize] = useState(100)

  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    })

    toast({
      title: `${settings[setting] ? "Disabled" : "Enabled"} ${setting}`,
      description: `${setting} has been ${settings[setting] ? "disabled" : "enabled"}.`,
    })

    // In a real app, you would apply these settings to the UI
    if (setting === "highContrast") {
      // Apply high contrast mode
      document.documentElement.classList.toggle("high-contrast", !settings.highContrast)
    } else if (setting === "reducedMotion") {
      // Apply reduced motion
      document.documentElement.classList.toggle("reduced-motion", !settings.reducedMotion)
    } else if (setting === "largeText") {
      // Apply large text
      document.documentElement.classList.toggle("large-text", !settings.largeText)
    }
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])

    // In a real app, you would apply the font size to the UI
    document.documentElement.style.fontSize = `${value[0]}%`
  }

  const handleResetSettings = () => {
    setSettings({
      highContrast: false,
      reducedMotion: false,
      screenReader: false,
      largeText: false,
    })
    setFontSize(100)

    // Reset all applied settings
    document.documentElement.classList.remove("high-contrast", "reduced-motion", "large-text")
    document.documentElement.style.fontSize = "100%"

    toast({
      title: "Settings reset",
      description: "All accessibility settings have been reset to default.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Accessibility className="h-5 w-5 text-primary" />
          <CardTitle>Accessibility Settings</CardTitle>
        </div>
        <CardDescription>Customize the app to meet your accessibility needs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={() => handleToggleSetting("highContrast")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="large-text">Large Text</Label>
                <p className="text-sm text-muted-foreground">Use larger text throughout the app</p>
              </div>
            </div>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={() => handleToggleSetting("largeText")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 text-muted-foreground">🔄</div>
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and motion effects</p>
              </div>
            </div>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={() => handleToggleSetting("reducedMotion")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 text-muted-foreground">🔊</div>
              <div className="space-y-0.5">
                <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
              </div>
            </div>
            <Switch
              id="screen-reader"
              checked={settings.screenReader}
              onCheckedChange={() => handleToggleSetting("screenReader")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
              <Label>Font Size</Label>
            </div>
            <span className="text-sm">{fontSize}%</span>
          </div>
          <Slider value={[fontSize]} min={75} max={200} step={5} onValueChange={handleFontSizeChange} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Smaller</span>
            <span>Default</span>
            <span>Larger</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleResetSettings}>
          Reset to Defaults
        </Button>
      </CardFooter>
    </Card>
  )
}
