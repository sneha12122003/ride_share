"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, CreditCard, Leaf, TrendingUp, Users } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Your Analytics</CardTitle>
          <CardDescription>Track your carpooling activity and impact</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+8% from last {timeRange}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
                  <Leaf className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187.3 kg</div>
                  <p className="text-xs text-muted-foreground">+12% from last {timeRange}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$342.50</div>
                  <p className="text-xs text-muted-foreground">+5% from last {timeRange}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connections</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">+3 new this {timeRange}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Activity Over Time</CardTitle>
                <CardDescription>Your carpooling activity for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
                  <p className="ml-4 text-lg text-muted-foreground">Chart would render here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>CO₂ Emissions Saved</CardTitle>
                  <CardDescription>Total carbon emissions prevented</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full flex-col items-center justify-center">
                    <Leaf className="h-16 w-16 text-green-500" />
                    <div className="mt-4 text-3xl font-bold">187.3 kg</div>
                    <p className="text-sm text-muted-foreground">Equivalent to planting 9 trees</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to sustainability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Trees Equivalent</p>
                        <p className="text-xs text-muted-foreground">Based on CO₂ absorption capacity</p>
                      </div>
                      <div className="text-2xl font-bold">9</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Fuel Saved</p>
                        <p className="text-xs text-muted-foreground">Gallons of gasoline not consumed</p>
                      </div>
                      <div className="text-2xl font-bold">21.5</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Miles Not Driven</p>
                        <p className="text-xs text-muted-foreground">Individual car miles prevented</p>
                      </div>
                      <div className="text-2xl font-bold">483</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Environmental Rank</p>
                        <p className="text-xs text-muted-foreground">Your position among all users</p>
                      </div>
                      <div className="text-2xl font-bold">#126</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Money Saved</CardTitle>
                  <CardDescription>Financial benefits from carpooling</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full flex-col items-center justify-center">
                    <CreditCard className="h-16 w-16 text-primary" />
                    <div className="mt-4 text-3xl font-bold">$342.50</div>
                    <p className="text-sm text-muted-foreground">Compared to driving alone</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Breakdown</CardTitle>
                  <CardDescription>Where you've saved money</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Fuel Costs</p>
                        <p className="text-xs text-muted-foreground">Saved on gasoline expenses</p>
                      </div>
                      <div className="text-2xl font-bold">$187.25</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Maintenance</p>
                        <p className="text-xs text-muted-foreground">Reduced vehicle wear and tear</p>
                      </div>
                      <div className="text-2xl font-bold">$95.00</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Parking Fees</p>
                        <p className="text-xs text-muted-foreground">Avoided parking expenses</p>
                      </div>
                      <div className="text-2xl font-bold">$60.25</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Monthly Savings Rate</p>
                        <p className="text-xs text-muted-foreground">Average savings per month</p>
                      </div>
                      <div className="text-2xl font-bold">$85.63</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
