"use client"

import Link from "next/link"
import { LiquidCtaButton } from "@/components/buttons/liquid-cta-button"
import { Sparkles, ArrowRight, Mic, Globe2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-zinc-900/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-green-800/50 mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-sm text-zinc-300">AI Assistance for Public Good in India</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-zinc-100 block">Sahayak AI</span>
          <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
            Voice AI for Everyone.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Empowering rural and underserved communities across India with instant voice-first assistance in 9+ regional languages — for agriculture, government schemes, market prices, and health guidance.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <LiquidCtaButton>Launch Sahayak Assistant</LiquidCtaButton>
          </Link>
          <Link
            href="#features"
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <span>Explore Capabilities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Social proof / stats */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-full">
            <Mic className="w-4 h-4 text-green-400" />
            <span>Voice-First & Multilingual</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-full">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>Real-time Market Prices via Web Search</span>
          </div>
        </div>
      </div>
    </section>
  )
}

