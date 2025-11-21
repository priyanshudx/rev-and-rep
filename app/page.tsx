'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import MembershipPreview from '@/components/membership-preview'
import FloatingCTA from '@/components/floating-cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <MembershipPreview />
      <FloatingCTA />
      <Footer />
    </main>
  )
}
