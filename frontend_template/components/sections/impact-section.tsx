const metrics = [
  { value: "9+", label: "Regional Languages", description: "Hindi, English, Bengali & more" },
  { value: "100%", label: "Voice-First", description: "Hands-free speech navigation" },
  { value: "Real-time", label: "Market & News", description: "Powered by Firecrawl tool" },
  { value: "Instant", label: "Scheme Guidance", description: "Simple practical AI answers" },
]

export function ImpactSection() {
  return (
    <section id="impact" className="px-6 py-24 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        {/* Impact Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-green-500 uppercase tracking-wider mb-4">Our Impact</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Built for Public Good</h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-balance">
            Bridging the digital divide for underserved communities in India.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-green-800/50 hover:bg-zinc-900/80 transition-all duration-300 group text-center relative overflow-hidden"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-1 group-hover:text-green-400 transition-colors">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-zinc-300 mb-1">{metric.label}</p>
                <p className="text-xs text-zinc-500">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

