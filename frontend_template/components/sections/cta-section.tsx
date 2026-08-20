import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LiquidCtaButton } from "@/components/buttons/liquid-cta-button"

export function CtaSection() {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-transparent to-green-950/20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-6">Ready to try Sahayak AI?</h2>
        <p className="text-lg text-zinc-400 mb-10 text-balance">
          Ask questions in your preferred language using voice or text. Instant guidance for agriculture, government schemes, healthcare, and market prices.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <LiquidCtaButton>Try Sahayak Assistant Now</LiquidCtaButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

