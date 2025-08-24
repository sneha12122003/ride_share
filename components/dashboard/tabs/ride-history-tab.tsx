"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const pastRides = [
  {
    id: "1",
    driver: "John Doe",
    source: "San Francisco, CA",
    destination: "Palo Alto, CA",
    date: new Date(2025, 3, 10, 8, 30),
    price: 12.5,
    status: "completed",
    co2Saved: 5.2,
    isDriver: false,
    rated: true,
  },
  {
    id: "2",
    driver: "You",
    source: "San Francisco, CA",
    destination: "Mountain View, CA",
    date: new Date(2025, 3, 5, 9, 0),
    price: 15.0,
    status: "completed",
    co2Saved: 6.8,
    isDriver: true,
    rated: false,
  },
  {
    id: "3",
    driver: "Robert Johnson",
    source: "San Francisco, CA",
    destination: "San Jose, CA",
    date: new Date(2025, 3, 1, 10, 15),
    price: 18.5,
    status: "cancelled",
    co2Saved: 0,
    isDriver: false,
    rated: false,
  },
]

export function RideHistoryTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [selectedRide, setSelectedRide] = useState<(typeof pastRides)[0] | null>(null)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState("")

  const filteredRides = pastRides.filter((ride) => {
    const matchesSearch =
      ride.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.toLowerCase().includes(searchTerm.toLowerCase())

    if (timeFilter === "all") return matchesSearch
    if (timeFilter === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return matchesSearch && ride.date > oneMonthAgo
    }
    if (timeFilter === "year") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return matchesSearch && ride.date > oneYearAgo
    }
    return matchesSearch
  })

  const handleRateRide = (ride: (typeof pastRides)[0]) => {
    setSelectedRide(ride)
    setIsRatingDialogOpen(true)
  }

  const submitRating = () => {
    if (!selectedRide) return

    // In a real app, you would call your API to submit the rating
    toast({
      title: "Rating submitted",
      description: `You rated ${selectedRide.driver} ${rating} stars.`,
    })

    setIsRatingDialogOpen(false)
    setRating(5)
    setReview("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search rides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRides.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver/Rider</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">CO₂ Saved</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRides.map((ride) => (
                <TableRow key={ride.id}>
                  <TableCell className="font-medium">
                    {format(ride.date, "MMM d, yyyy")}
                    <div className="text-xs text-muted-foreground">{format(ride.date, "h:mm a")}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{ride.source}</span>
                      <span className="text-muted-foreground">to</span>
                      <span className="font-medium">{ride.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ride.isDriver ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        You (Driver)
                      </span>
                    ) : (
                      <span>{ride.driver}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">${ride.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        ride.status === "completed"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {ride.status === "completed" ? "Completed" : "Cancelled"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {ride.co2Saved > 0 ? `${ride.co2Saved.toFixed(1)} kg` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {ride.status === "completed" && !ride.rated && !ride.isDriver && (
                      <Button variant="outline" size="sm" onClick={() => handleRateRide(ride)}>
                        <Star className="mr-1 h-3 w-3" />
                        Rate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No ride history</h3>
          <p className="mt-2 text-sm text-muted-foreground">You haven't taken any rides yet.</p>
        </div>
      )}

      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate your ride</DialogTitle>
            <DialogDescription>
              {selectedRide && (
                <span>
                  Rate your ride with {selectedRide.driver} from {selectedRide.source} to {selectedRide.destination}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${
                      rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Share your experience (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="resize-none"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitRating}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
