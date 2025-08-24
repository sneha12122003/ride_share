"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

export function CTASection() {
  return (
    <section id="cta" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to start your sustainable journey?
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join SmartCommuteX today and be part of the solution for a greener future. Save money, reduce emissions, and
            connect with like-minded commuters.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/auth/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Log In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
