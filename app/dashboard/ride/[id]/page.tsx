import { AdvancedMap } from "@/components/dashboard/advanced-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageSquare, Share2, Shield, Star, Users } from "lucide-react"
import { format } from "date-fns"

export default function RideDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the ride details from your API
  const ride = {
    id: params.id,
    driver: {
      name: "John Doe",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "Palo Alto, CA",
    date: new Date(2025, 4, 15, 8, 30),
    price: 12.5,
    seats: 3,
    bookedSeats: 1,
    co2Saved: 5.2,
    preferences: ["AC", "Non-smoker"],
    pickupPoint: { lat: 37.7749, lng: -122.4194 },
    dropoffPoint: { lat: 37.4419, lng: -122.143 },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ride Details</h1>
          <p className="text-muted-foreground">View details and manage your upcoming ride</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Trip
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Driver
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <AdvancedMap
            source={ride.source}
            destination={ride.destination}
            pickupPoint={ride.pickupPoint}
            dropoffPoint={ride.dropoffPoint}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Information</CardTitle>
              <CardDescription>{format(ride.date, "EEEE, MMMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={ride.driver.image} alt={ride.driver.name} />
                  <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ride.driver.name}</p>
                  <div className="flex items-center">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{ride.driver.rating}</span>
                  </div>
                </div>
              </div>

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

                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    {ride.bookedSeats}/{ride.seats} seats booked
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {ride.preferences.map((pref) => (
                    <Badge key={pref} variant="secondary" className="text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-lg font-bold">${ride.price.toFixed(2)}</p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {ride.co2Saved.toFixed(1)} kg CO₂ saved
              </Badge>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Features</CardTitle>
              <CardDescription>Safety tools for your peace of mind</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="destructive">
                <Shield className="mr-2 h-4 w-4" />
                Emergency Alert
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This will notify your emergency contacts with your current location
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
