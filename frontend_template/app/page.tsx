import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { SahayakAssistant } from "@/components/sahayak-assistant"
import { ImpactSection } from "@/components/sections/impact-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { CtaSection } from "@/components/sections/cta-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <HeroSection />
      
      {/* Live Voice & Multilingual Assistant Interface */}
      <section id="assistant" className="px-4 py-12 relative z-20 -mt-10 mb-12">
        <SahayakAssistant />
      </section>

      <ImpactSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}

