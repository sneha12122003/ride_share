"use client"

import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Leaf, MapPin, MessageSquare, Share2, Star, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface RideCardProps {
  ride: {
    id: string
    driver: {
      name: string
      rating: number
      image: string
    }
    source: string
    destination: string
    date: Date
    price: number
    seats: number
    bookedSeats?: number
    co2Saved: number
    preferences: string[]
    isDriver?: boolean
    isPending?: boolean
  }
}

export function RideCard({ ride }: RideCardProps) {
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBookRide = () => {
    setIsLoading(true)
    // In a real app, you would call your API to book the ride
    setTimeout(() => {
      setIsLoading(false)
      setIsBookDialogOpen(false)
      toast({
        title: "Ride booked successfully",
        description: `Your ride with ${ride.driver.name} has been booked.`,
      })
    }, 1500)
  }

  const handleCancelRide = () => {
    setIsLoading(true)
    // In a real app, you would call your API to cancel the ride
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Ride cancelled",
        description: "Your ride has been cancelled.",
      })
    }, 1500)
  }

  const handleAcceptRide = () => {
    setIsLoading(true)
    // In a real app, you would call your API to accept the ride
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Ride accepted",
        description: "You have accepted the ride request.",
      })
    }, 1500)
  }

  const handleRejectRide = () => {
    setIsLoading(true)
    // In a real app, you would call your API to reject the ride
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Ride rejected",
        description: "You have rejected the ride request.",
      })
    }, 1500)
  }

  const handleShareTrip = () => {
    // In a real app, you would implement sharing functionality
    toast({
      title: "Trip shared",
      description: "Trip details have been shared via email.",
    })
  }

  const handleContactDriver = () => {
    // In a real app, you would open a chat with the driver
    toast({
      title: "Chat opened",
      description: `You can now chat with ${ride.driver.name}.`,
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={ride.driver.image} alt={ride.driver.name} />
              <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{ride.isDriver ? "Your ride" : ride.driver.name}</CardTitle>
              {!ride.isDriver && (
                <div className="flex items-center">
                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{ride.driver.rating}</span>
                </div>
              )}
            </div>
          </div>
          {ride.isPending && (
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            >
              Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{ride.source}</p>
              <p className="text-xs text-muted-foreground">to</p>
              <p className="text-sm font-medium leading-none">{ride.destination}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{format(ride.date, "EEEE, MMMM d, yyyy")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{format(ride.date, "h:mm a")}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {ride.preferences.map((pref) => (
              <Badge key={pref} variant="secondary" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                {ride.bookedSeats !== undefined
                  ? `${ride.bookedSeats}/${ride.seats} seats booked`
                  : `${ride.seats} seats available`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium">{ride.co2Saved.toFixed(1)} kg CO₂ saved</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-lg font-bold">${ride.price.toFixed(2)}</p>
        <div className="flex space-x-2">
          {ride.isDriver ? (
            <>
              <Button variant="outline" size="sm" onClick={handleShareTrip}>
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button size="sm" onClick={handleContactDriver}>
                <MessageSquare className="mr-1 h-4 w-4" />
                Messages
              </Button>
            </>
          ) : ride.isPending ? (
            <>
              <Button variant="outline" size="sm" onClick={handleRejectRide} disabled={isLoading}>
                Reject
              </Button>
              <Button size="sm" onClick={handleAcceptRide} disabled={isLoading}>
                {isLoading ? "Processing..." : "Accept"}
              </Button>
            </>
          ) : ride.bookedSeats !== undefined ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancelRide} disabled={isLoading}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleContactDriver}>
                <MessageSquare className="mr-1 h-4 w-4" />
                Contact
              </Button>
            </>
          ) : (
            <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Book Ride</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book this ride</DialogTitle>
                  <DialogDescription>
                    You are about to book a ride with {ride.driver.name} from {ride.source} to {ride.destination} on{" "}
                    {format(ride.date, "EEEE, MMMM d")} at {format(ride.date, "h:mm a")}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-lg font-bold">${ride.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Seats</p>
                      <p className="text-lg font-bold">{ride.seats} available</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Driver</p>
                    <div className="flex items-center space-x-2 pt-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={ride.driver.image} alt={ride.driver.name} />
                        <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{ride.driver.name}</p>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{ride.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBookDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBookRide} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Confirm Booking"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
