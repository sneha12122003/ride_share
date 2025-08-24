"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FindRideTab } from "./tabs/find-ride-tab"
import { OfferRideTab } from "./tabs/offer-ride-tab"
import { MyRidesTab } from "./tabs/my-rides-tab"
import { RideHistoryTab } from "./tabs/ride-history-tab"
import { LeaderboardTab } from "./tabs/leaderboard-tab"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("find-ride")

  return (
    <Tabs defaultValue="find-ride" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
        <TabsTrigger value="find-ride">Find Ride</TabsTrigger>
        <TabsTrigger value="offer-ride">Offer Ride</TabsTrigger>
        <TabsTrigger value="my-rides">My Rides</TabsTrigger>
        <TabsTrigger value="ride-history">Ride History</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
      </TabsList>
      <TabsContent value="find-ride" className="space-y-4">
        <FindRideTab />
      </TabsContent>
      <TabsContent value="offer-ride" className="space-y-4">
        <OfferRideTab />
      </TabsContent>
      <TabsContent value="my-rides" className="space-y-4">
        <MyRidesTab />
      </TabsContent>
      <TabsContent value="ride-history" className="space-y-4">
        <RideHistoryTab />
      </TabsContent>
      <TabsContent value="leaderboard" className="space-y-4">
        <LeaderboardTab />
      </TabsContent>
    </Tabs>
  )
}
