"use client"

import { motion } from "framer-motion"
import { Mic, Globe, Search, Landmark, Sprout, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-3">AI for Public Good</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mb-4">
            Designed for Accessibility & Empowerment
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-balance">
            Sahayak AI breaks language, literacy, and technology barriers across rural and urban India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1: Voice & Multilingual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="group h-full overflow-hidden border-zinc-800/80 bg-zinc-900/60 hover:border-green-800/60 transition-all duration-300 rounded-3xl p-2">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-green-950/80 border border-green-800/50 flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Voice-First & 9+ Indian Languages
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Speak naturally in Hindi, English, Bengali, Marathi, Tamil, Telugu, Kannada, Gujarati, or Punjabi. Integrated text-to-speech reads answers aloud for hands-free convenience.
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
                  {["हिंदी", "English", "বাংলা", "मराठी", "தமிழ்", "తెలుగు"].map((lang) => (
                    <span key={lang} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 2: Real-time Mandi Prices & Web Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="group h-full overflow-hidden border-zinc-800/80 bg-zinc-900/60 hover:border-emerald-800/60 transition-all duration-300 rounded-3xl p-2">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Real-time Mandi Prices & Weather (Firecrawl)
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Powered by web search tools, Sahayak AI fetches live market prices for crops, weather alerts, and news directly when you ask for today's updates.
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 border-t border-zinc-800/60 text-xs text-emerald-400 font-medium">
                  <Sprout className="w-4 h-4" /> Live Market & Agricultural Intelligence
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 3: Government Scheme Navigator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="group h-full overflow-hidden border-zinc-800/80 bg-zinc-900/60 hover:border-teal-800/60 transition-all duration-300 rounded-3xl p-2">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-teal-950/80 border border-teal-800/50 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Government Scheme Guidance
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Get practical, simple guidance on central and state government schemes including PM-Kisan, Ayushman Bharat, KCC loans, and housing subsidies.
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 border-t border-zinc-800/60 text-xs text-teal-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Simple Step-by-Step Instructions
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 4: Ultra-fast Streaming & Low Bandwidth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="group h-full overflow-hidden border-zinc-800/80 bg-zinc-900/60 hover:border-green-800/60 transition-all duration-300 rounded-3xl p-2">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-green-950/80 border border-green-800/50 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-100 mb-2">
                  Fast Streaming for Low Bandwidth
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Optimized server streaming guarantees zero waiting time even on slow mobile networks in remote regions. Words stream instantly as they generate.
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 border-t border-zinc-800/60 text-xs text-green-400 font-medium">
                  <Zap className="w-4 h-4" /> 2G/3G Network Optimized Response
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

