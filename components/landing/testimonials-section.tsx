"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "SmartCommuteX has completely transformed my daily commute. I save money, meet interesting people, and feel good about reducing my carbon footprint. The app is intuitive and finding compatible rides is a breeze!",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As someone who drives to work every day, offering rides through SmartCommuteX has helped me offset my fuel costs significantly. The smart matching algorithm finds passengers along my route perfectly.",
  },
  {
    name: "Emma Rodriguez",
    role: "University Student",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The safety features give me peace of mind when carpooling with new people. I love being able to track my environmental impact and seeing how much CO₂ I've helped save. Plus, the rewards system makes it fun!",
  },
  {
    name: "David Kim",
    role: "Marketing Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I've been using SmartCommuteX for 6 months and it's been reliable every time. The real-time tracking and chat features make coordination seamless, and I've actually made some good friends through my regular carpools.",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What our users say</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of satisfied commuters who have transformed their daily travel with SmartCommuteX.
          </p>
        </motion.div>

        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 text-center">
                          <p className="text-lg italic">"{testimonial.content}"</p>
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden md:flex"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full hidden md:flex"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
