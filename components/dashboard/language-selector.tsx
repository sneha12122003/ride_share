"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

const dateFormats = [
  { value: "mdy", label: "MM/DD/YYYY", example: "04/28/2025" },
  { value: "dmy", label: "DD/MM/YYYY", example: "28/04/2025" },
  { value: "ymd", label: "YYYY-MM-DD", example: "2025-04-28" },
]

const timeFormats = [
  { value: "12h", label: "12-hour", example: "2:30 PM" },
  { value: "24h", label: "24-hour", example: "14:30" },
]

export function LanguageSelector() {
  const [language, setLanguage] = useState("en")
  const [dateFormat, setDateFormat] = useState("mdy")
  const [timeFormat, setTimeFormat] = useState("12h")

  const handleLanguageChange = (value: string) => {
    setLanguage(value)

    toast({
      title: "Language changed",
      description: `The application language has been changed to ${languages.find((lang) => lang.code === value)?.name}.`,
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your localization preferences have been saved.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle>Language & Localization</CardTitle>
        </div>
        <CardDescription>Customize language and regional preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="language">Application Language</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center">
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date Format</Label>
          <RadioGroup value={dateFormat} onValueChange={setDateFormat} className="space-y-3">
            {dateFormats.map((format) => (
              <div key={format.value} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={format.value} id={`date-${format.value}`} />
                <Label htmlFor={`date-${format.value}`} className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <span>{format.label}</span>
                    <span className="text-muted-foreground">{format.example}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Time Format</Label>
          <RadioGroup value={timeFormat} onValueChange={setTimeFormat} className="space-y-3">
            {timeFormats.map((format) => (
              <div key={format.value} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={format.value} id={`time-${format.value}`} />
                <Label htmlFor={`time-${format.value}`} className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <span>{format.label}</span>
                    <span className="text-muted-foreground">{format.example}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button className="w-full" onClick={handleSavePreferences}>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
