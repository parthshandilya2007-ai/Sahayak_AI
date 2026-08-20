import { Check, HeartHandshake, Sprout, ShieldCheck } from "lucide-react"
import Link from "next/link"

const useCases = [
  {
    name: "Farmers & Agriculture",
    description: "Daily Mandi crop prices, weather updates, crop health advice, and fertilizer guidance.",
    badge: "100% Free Public Good",
    icon: Sprout,
    features: [
      "Live Mandi market prices (Firecrawl web tool)",
      "Daily rainfall & weather alerts",
      "Pesticide & soil health guidance",
      "PM-Kisan & KCC loan application steps",
    ],
    cta: "Launch Farmer Assistant",
    highlighted: true,
  },
  {
    name: "Citizens & Rural Youth",
    description: "Instant access to government schemes, health guidance, education, and skill development.",
    badge: "Open Access",
    icon: HeartHandshake,
    features: [
      "Ayushman Bharat & health card assistance",
      "Ration card & PDS distribution info",
      "Skill India & job training programs",
      "Multilingual voice read-aloud support",
    ],
    cta: "Explore Schemes",
    highlighted: false,
  },
  {
    name: "Small Businesses & Artisans",
    description: "Financial literacy, MUDRA loans, craft marketing, and government subsidy information.",
    badge: "Community Empowerment",
    icon: ShieldCheck,
    features: [
      "PM MUDRA loan eligibility guidelines",
      "Vishwakarma scheme for artisans",
      "Local market pricing & trade advice",
      "Zero registration or subscription fees",
    ],
    cta: "Start Voice Assistant",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="access" className="px-6 py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-3">Free & Open Public Service</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Built for Every Citizen of India
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-balance text-lg">
            No subscriptions. No hidden charges. Sahayak AI is 100% free for public good.
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon
            return (
              <div
                key={useCase.name}
                className={`p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${
                  useCase.highlighted 
                    ? "bg-gradient-to-b from-green-950/40 via-zinc-900/80 to-zinc-900/60 border-green-700/60 shadow-xl" 
                    : "bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700/60"
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-green-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-950/80 text-green-400 border border-green-800/40">
                      {useCase.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-zinc-100 mb-2">
                    {useCase.name}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{useCase.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1 border-t border-zinc-800/60 pt-6">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 shrink-0 text-green-400 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/dashboard"
                  className={`block w-full py-3 px-6 text-center rounded-full font-medium text-sm transition-colors mt-auto ${
                    useCase.highlighted
                      ? "bg-green-600 text-zinc-950 hover:bg-green-500 font-bold"
                      : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  }`}
                >
                  {useCase.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

