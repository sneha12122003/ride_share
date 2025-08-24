"use client"

import { motion } from "framer-motion"
import { Car, MapPin, Calendar, MessageSquare, Shield, Star, Award, Leaf } from "lucide-react"

const features = [
  {
    icon: Car,
    title: "Offer & Find Rides",
    description: "Easily offer rides or find available carpools that match your route and schedule.",
  },
  {
    icon: MapPin,
    title: "Smart Route Matching",
    description: "Our AI-powered algorithm finds the most compatible rides based on your location and preferences.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Set up one-time rides or recurring carpools for your daily commute.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Communicate with your carpool partners through our secure in-app messaging system.",
  },
  {
    icon: Shield,
    title: "Safety Features",
    description: "Share your trip details, set emergency contacts, and verify identity for peace of mind.",
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    description: "Track your CO₂ savings and see your positive contribution to the environment.",
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description: "Build trust with community ratings and reviews after each completed ride.",
  },
  {
    icon: Award,
    title: "Rewards & Gamification",
    description: "Earn badges and climb the leaderboard as you save more CO₂ through carpooling.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need for smart carpooling
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SmartCommuteX combines powerful features to make carpooling efficient, safe, and rewarding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-3 rounded-lg border bg-background p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
