"use client"

import { motion } from "framer-motion"
import { Car, Users, Leaf } from "lucide-react"

const stats = [
  {
    icon: Car,
    value: "50K+",
    label: "Rides Completed",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Active Users",
  },
  {
    icon: Leaf,
    value: "500K+",
    label: "kg CO₂ Saved",
  },
]

export function StatsSection() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center space-y-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold sm:text-4xl md:text-5xl">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
