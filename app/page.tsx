import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { ScreenshotsSection } from "@/components/landing/screenshots-section"
import { CTASection } from "@/components/landing/cta-section"
import { StatsSection } from "@/components/landing/stats-section"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ScreenshotsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
