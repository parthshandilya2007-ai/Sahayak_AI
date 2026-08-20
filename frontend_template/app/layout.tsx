import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/providers/lenis-provider"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Sahayak AI | Voice & Multilingual Assistant for Public Good",
  description:
    "Empowering rural and underserved communities across India with instant voice-first AI assistance in 9+ regional languages for agriculture, government schemes, market prices, weather, and health.",
  generator: "Sahayak AI",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased bg-zinc-950 text-zinc-100 selection:bg-green-500 selection:text-zinc-950`}>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}

