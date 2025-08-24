"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"
import { RideCard } from "@/components/dashboard/ride-card"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for AI suggestions
const mockSuggestions = [
  {
    id: "ai-1",
    driver: {
      name: "Sarah Johnson",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "Palo Alto, CA",
    date: new Date(2025, 4, 15, 8, 30),
    price: 12.5,
    seats: 3,
    co2Saved: 5.2,
    preferences: ["AC", "Non-smoker"],
    matchScore: 95,
    matchReason: "Perfect route match, similar schedule to your past rides, highly rated driver",
  },
  {
    id: "ai-2",
    driver: {
      name: "Michael Chen",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "Mountain View, CA",
    date: new Date(2025, 4, 15, 9, 0),
    price: 15.0,
    seats: 2,
    co2Saved: 6.8,
    preferences: ["AC", "Women-only"],
    matchScore: 87,
    matchReason: "Close to your preferred route, driver has similar music taste based on profile",
  },
]

export function AiRideSuggestions() {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([])

  useEffect(() => {
    // Simulate API call to get AI suggestions
    const timer = setTimeout(() => {
      setIsLoading(false)
      setSuggestions(mockSuggestions)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleFeedback = (id: string, isPositive: boolean) => {
    // In a real app, you would send this feedback to your API
    // to improve the AI suggestions
    console.log(`Feedback for suggestion ${id}: ${isPositive ? "positive" : "negative"}`)

    // Remove the suggestion from the list
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>AI-Powered Ride Suggestions</CardTitle>
        </div>
        <CardDescription>
          Personalized ride recommendations based on your preferences and travel patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {suggestion.matchScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.matchReason}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleFeedback(suggestion.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleFeedback(suggestion.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <RideCard ride={suggestion} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No suggestions available</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll generate personalized ride suggestions based on your activity
            </p>
          </div>
        )}
      </CardContent>
      {suggestions.length > 0 && (
        <CardFooter>
          <Button variant="outline" className="w-full">
            Refresh Suggestions
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
