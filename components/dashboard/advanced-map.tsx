"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, Navigation, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface AdvancedMapProps {
  source: string
  destination: string
  pickupPoint?: { lat: number; lng: number }
  dropoffPoint?: { lat: number; lng: number }
  isLive?: boolean
  driverLocation?: { lat: number; lng: number }
}

export function AdvancedMap({
  source,
  destination,
  pickupPoint,
  dropoffPoint,
  isLive = false,
  driverLocation,
}: AdvancedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null)
  const [estimatedDistance, setEstimatedDistance] = useState<string | null>(null)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Simulate route calculation
      setEstimatedTime("32 mins")
      setEstimatedDistance("18.4 km")
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // In a real implementation, you would use the Google Maps or Mapbox SDK
  // to render the map and calculate routes

  const handleNavigate = () => {
    // In a real app, this would open the native maps app with directions
    toast({
      title: "Navigation started",
      description: "Opening navigation in your default maps application.",
    })
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(
        destination,
      )}`,
      "_blank",
    )
  }

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My current location",
          text: "Track my ride in real-time",
          url: "https://smartcommutex.com/track/ABC123", // This would be a unique tracking URL
        })
        .then(() => {
          toast({
            title: "Location shared",
            description: "Your location has been shared successfully.",
          })
        })
        .catch((error) => {
          toast({
            title: "Error sharing location",
            description: "There was an error sharing your location.",
            variant: "destructive",
          })
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast({
        title: "Location sharing link copied",
        description: "A link to track your location has been copied to your clipboard.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Map</CardTitle>
        <CardDescription>
          {source} to {destination}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center space-y-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          ) : (
            <>
              <div
                ref={mapRef}
                className="relative h-[300px] w-full overflow-hidden rounded-md bg-muted"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=300&width=600')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* This would be replaced with actual map rendering */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-medium text-muted-foreground">Map would render here</p>
                </div>

                {isLive && driverLocation && (
                  <div className="absolute bottom-4 left-4 rounded-md bg-background p-3 shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                      <p className="text-sm font-medium">Driver is on the way</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Arriving in approximately {estimatedTime}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Estimated Time</p>
                  <p className="text-lg font-bold">{estimatedTime}</p>
                </div>
                <div className="rounded-md border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-lg font-bold">{estimatedDistance}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" onClick={handleNavigate}>
                  <Navigation className="mr-2 h-4 w-4" />
                  Navigate
                </Button>
                <Button variant="outline" onClick={handleShareLocation}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Location
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
