"use client"

import Link from "next/link"
import { Globe } from "lucide-react"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#impact", label: "Impact" },
  { href: "#testimonials", label: "Testimonials" },
]

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-6 rounded-full bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-md">
        <Link href="/" className="font-display text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Globe className="h-5 w-5 text-green-500" />
          <span>Sahayak AI</span>
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors shadow-sm"
          >
            Launch Assistant
          </Link>
        </div>
      </nav>
    </header>
  )
}

