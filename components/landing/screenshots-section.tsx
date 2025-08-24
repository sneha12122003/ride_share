"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const screenshots = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "View all your upcoming rides and activity at a glance.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "find-ride",
    title: "Find Ride",
    description: "Search for available rides with advanced filtering options.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "offer-ride",
    title: "Offer Ride",
    description: "Create and manage your ride offerings with ease.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "tracking",
    title: "Live Tracking",
    description: "Real-time tracking and navigation for ongoing rides.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export function ScreenshotsSection() {
  return (
    <section id="screenshots" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Screenshots</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">See SmartCommuteX in action</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore the intuitive interface and powerful features of our carpooling platform.
          </p>
        </motion.div>

        <div className="mt-12">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {screenshots.map((screenshot) => (
                <TabsTrigger key={screenshot.id} value={screenshot.id}>
                  {screenshot.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {screenshots.map((screenshot) => (
              <TabsContent key={screenshot.id} value={screenshot.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 overflow-hidden rounded-xl border bg-background shadow-lg"
                >
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">{screenshot.title}</h3>
                    <p className="text-sm text-muted-foreground">{screenshot.description}</p>
                  </div>
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={screenshot.image || "/placeholder.svg"}
                      alt={screenshot.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
