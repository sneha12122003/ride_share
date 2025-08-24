"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { RideCard } from "@/components/dashboard/ride-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  source: z.string().min(2, {
    message: "Please enter a valid source location.",
  }),
  destination: z.string().min(2, {
    message: "Please enter a valid destination location.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  seats: z.string().min(1, {
    message: "Please select the number of seats.",
  }),
})

const mockRides = [
  {
    id: "1",
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
    co2Saved: 5.2,
    preferences: ["AC", "Non-smoker"],
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
    date: new Date(2025, 4, 15, 9, 0),
    price: 15.0,
    seats: 2,
    co2Saved: 6.8,
    preferences: ["AC", "Women-only"],
  },
  {
    id: "3",
    driver: {
      name: "Robert Johnson",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
    },
    source: "San Francisco, CA",
    destination: "San Jose, CA",
    date: new Date(2025, 4, 15, 10, 15),
    price: 18.5,
    seats: 4,
    co2Saved: 8.3,
    preferences: ["AC", "Non-smoker"],
  },
]

export function FindRideTab() {
  const [searchResults, setSearchResults] = useState<typeof mockRides | null>(null)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      destination: "",
      seats: "1",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would call your API to search for rides
    // For now, we'll just set the mock data
    setSearchResults(mockRides)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seats</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 seat</SelectItem>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="3">3 seats</SelectItem>
                        <SelectItem value="4">4 seats</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" type="button">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your search with additional filters</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="time">
                        <AccordionTrigger>Time Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Departure time</label>
                              <div className="flex items-center space-x-2">
                                <Select defaultValue="06:00">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="From" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="00:00">12:00 AM</SelectItem>
                                    <SelectItem value="06:00">6:00 AM</SelectItem>
                                    <SelectItem value="12:00">12:00 PM</SelectItem>
                                    <SelectItem value="18:00">6:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                                <span>to</span>
                                <Select defaultValue="23:59">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="To" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="12:00">12:00 PM</SelectItem>
                                    <SelectItem value="18:00">6:00 PM</SelectItem>
                                    <SelectItem value="23:59">11:59 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">$0</span>
                                <span className="text-sm">$50</span>
                              </div>
                              <Slider defaultValue={[0, 30]} max={50} step={1} className="py-2" />
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">$0 - $30</div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="preferences">
                        <AccordionTrigger>Preferences</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="ac" />
                              <label
                                htmlFor="ac"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Air Conditioning
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="non-smoker" />
                              <label
                                htmlFor="non-smoker"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Non-smoker
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="women-only" />
                              <label
                                htmlFor="women-only"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Women only
                              </label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsFiltersOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsFiltersOpen(false)}>Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search Rides
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {searchResults && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Rides</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
