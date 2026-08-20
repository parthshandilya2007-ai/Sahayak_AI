"use client"

import { motion } from "framer-motion"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "Sahayak AI helps me check daily wheat mandi prices in Haryana in Hindi voice. It saves me from middleman price cuts!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Ramesh Kumar",
    role: "Wheat Farmer, Haryana",
  },
  {
    text: "I asked Sahayak AI about Ayushman Bharat health card in Marathi. It explained step-by-step how to get it for my family.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Sunita Deshmukh",
    role: "Homemaker, Maharashtra",
  },
  {
    text: "Being able to speak in Bengali and hear answers read aloud makes government scheme applications simple for elders.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Subhash Banerjee",
    role: "Retired Teacher, West Bengal",
  },
  {
    text: "I checked fertilizer recommendations and rainfall forecast for my cotton field. The response was fast and clear.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Gurpreet Singh",
    role: "Cotton & Rice Farmer, Punjab",
  },
  {
    text: "The voice interface is so easy to use. My father doesn't type well, but he asks Sahayak AI questions every day.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "Student & Volunteer, MP",
  },
  {
    text: "Sahayak AI gave me instant advice on solar pump subsidies under PM-KUSUM. Truly an invaluable assistant.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Venkat Rao",
    role: "Farmer, Andhra Pradesh",
  },
]

const firstColumn = testimonials.slice(0, 2)
const secondColumn = testimonials.slice(2, 4)
const thirdColumn = testimonials.slice(4, 6)

const impactHighlights = ["Farmers First", "9+ Languages", "Voice Accessible", "Live Mandi Data", "Scheme Assistance", "Public Good AI"]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-12"
        >
          <div className="border border-green-800/60 bg-green-950/40 py-1.5 px-4 rounded-full text-xs font-semibold text-green-400">
            Community Stories
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mt-6 text-center tracking-tight">
            Impact Across India
          </h2>
          <p className="text-center mt-4 text-zinc-400 text-lg text-balance">
            Real stories from farmers, families, and citizens using Sahayak AI.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

        <div className="mt-16 pt-16 border-t border-zinc-800/50">
          <p className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8">Empowering Public Good</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              {[...impactHighlights, ...impactHighlights].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="text-lg font-bold text-zinc-600 hover:text-green-400 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  ✦ {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

