"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RideCard } from "@/components/dashboard/ride-card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

const upcomingRides = [
  {
    id: "1",
    driver: {
      name: "You",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "Palo Alto, CA",
    date: new Date(2025, 4, 15, 8, 30),
    price: 12.5,
    seats: 3,
    bookedSeats: 2,
    co2Saved: 5.2,
    preferences: ["AC", "Non-smoker"],
    isDriver: true,
  },
  {
    id: "2",
    driver: {
      name: "Jane Smith",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "Mountain View, CA",
    date: new Date(2025, 4, 18, 9, 0),
    price: 15.0,
    seats: 2,
    bookedSeats: 1,
    co2Saved: 6.8,
    preferences: ["AC", "Women-only"],
    isDriver: false,
  },
]

const pendingRides = [
  {
    id: "3",
    driver: {
      name: "Robert Johnson",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "San Jose, CA",
    date: new Date(2025, 4, 20, 10, 15),
    price: 18.5,
    seats: 4,
    bookedSeats: 0,
    co2Saved: 8.3,
    preferences: ["AC", "Non-smoker"],
    isDriver: false,
    isPending: true,
  },
]

export function MyRidesTab() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingRides.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No upcoming rides</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any upcoming rides scheduled.</p>
              <Button className="mt-4" onClick={() => setActiveTab("find-ride")}>
                Find a Ride
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {pendingRides.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No pending rides</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any pending ride requests.</p>
              <Button className="mt-4" onClick={() => setActiveTab("find-ride")}>
                Find a Ride
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
