"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, Trophy, Medal } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const leaderboardData = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 523.4,
    ridesCompleted: 78,
    badges: ["Green Commuter", "Reliable Driver"],
    streak: 12,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 487.2,
    ridesCompleted: 65,
    badges: ["Green Commuter", "Ride Enthusiast"],
    streak: 8,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 412.8,
    ridesCompleted: 54,
    badges: ["Green Commuter"],
    streak: 5,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 356.1,
    ridesCompleted: 47,
    badges: ["Reliable Driver"],
    streak: 3,
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 298.5,
    ridesCompleted: 42,
    badges: [],
    streak: 0,
  },
  {
    id: "6",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    co2Saved: 187.3,
    ridesCompleted: 25,
    badges: ["Green Commuter"],
    streak: 4,
    isCurrentUser: true,
  },
]

const badgeInfo = {
  "Green Commuter": {
    description: "Saved over 100kg of CO₂",
    icon: Leaf,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  "Reliable Driver": {
    description: "Completed over 50 rides",
    icon: Award,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "Ride Enthusiast": {
    description: "Used the app for over 6 months",
    icon: Trophy,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
}

export function LeaderboardTab() {
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [sortBy, setSortBy] = useState("co2")
  const [activeTab, setActiveTab] = useState("leaderboard")

  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    if (sortBy === "co2") {
      return b.co2Saved - a.co2Saved
    } else if (sortBy === "rides") {
      return b.ridesCompleted - a.ridesCompleted
    } else {
      return b.streak - a.streak
    }
  })

  const currentUserRank = sortedLeaderboard.findIndex((user) => user.isCurrentUser) + 1
  const currentUser = sortedLeaderboard.find((user) => user.isCurrentUser)

  // Calculate progress to next badge
  const co2Progress = currentUser ? (currentUser.co2Saved / 100) * 100 : 0
  const ridesProgress = currentUser ? (currentUser.ridesCompleted / 50) * 100 : 0

  return (
    <div className="space-y-6">
      <Tabs defaultValue="leaderboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">My Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All time</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="week">This week</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="co2">CO₂ Saved</SelectItem>
                <SelectItem value="rides">Rides Completed</SelectItem>
                <SelectItem value="streak">Current Streak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sortedLeaderboard.slice(0, 3).map((user, index) => (
              <Card key={user.id} className={`${user.isCurrentUser ? "border-primary/50 bg-primary/5" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {index === 0 ? (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        ) : index === 1 ? (
                          <Medal className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Medal className="h-4 w-4 text-amber-700" />
                        )}
                      </div>
                      <CardTitle className="text-lg">#{index + 1}</CardTitle>
                    </div>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="font-normal">
                        You
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.badges.length} badges</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm font-medium">{user.co2Saved.toFixed(1)} kg</p>
                      <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.ridesCompleted}</p>
                      <p className="text-xs text-muted-foreground">Rides</p>
                    </div>
                  </div>
                  {user.streak > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-xs text-muted-foreground">
                        {user.streak} day{user.streak !== 1 ? "s" : ""} streak
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>See how you rank against other commuters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedLeaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between rounded-lg p-2 ${
                      user.isCurrentUser ? "bg-primary/5" : index % 2 === 0 ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {index + 1}
                      </span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge variant="outline" className="ml-2 font-normal">
                              You
                            </Badge>
                          )}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {user.badges.map((badge) => (
                            <span
                              key={badge}
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                                badgeInfo[badge as keyof typeof badgeInfo].color
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-right">
                      <div>
                        <p className="text-sm font-medium">{user.co2Saved.toFixed(1)} kg</p>
                        <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.ridesCompleted}</p>
                        <p className="text-xs text-muted-foreground">Rides</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Badges</CardTitle>
              <CardDescription>Earn badges by using SmartCommuteX and reducing your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(badgeInfo).map(([badge, info]) => {
                  const earned = currentUser?.badges.includes(badge)
                  return (
                    <div
                      key={badge}
                      className={`rounded-lg border p-4 ${earned ? "border-primary/50 bg-primary/5" : "opacity-70"}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            earned ? info.color : "bg-muted"
                          }`}
                        >
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{badge}</h3>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                      {!earned && badge === "Green Commuter" && (
                        <div className="mt-4 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{currentUser?.co2Saved.toFixed(1)}/100 kg CO₂</span>
                          </div>
                          <Progress value={co2Progress} className="h-2" />
                        </div>
                      )}
                      {!earned && badge === "Reliable Driver" && (
                        <div className="mt-4 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{currentUser?.ridesCompleted}/50 rides</span>
                          </div>
                          <Progress value={ridesProgress} className="h-2" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
              <CardDescription>Maintain your streak by carpooling regularly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
                  {currentUser?.streak || 0}
                </div>
                <p className="mt-4 text-center text-lg font-medium">
                  {currentUser?.streak
                    ? `${currentUser.streak} day${currentUser.streak !== 1 ? "s" : ""} streak`
                    : "No active streak"}
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  {currentUser?.streak
                    ? "Keep it up! Take another ride tomorrow to continue your streak."
                    : "Start your streak by taking a ride today!"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
