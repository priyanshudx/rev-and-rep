'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">RR</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">REV & REP</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition">Home</Link>
            <Link href="/services" className="text-foreground hover:text-accent transition">Services</Link>
            <Link href="/car-wash" className="text-foreground hover:text-accent transition">Car Wash</Link>
            <Link href="/membership" className="text-foreground hover:text-accent transition">Membership</Link>
            <Link href="/gallery" className="text-foreground hover:text-accent transition">Gallery</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-accent"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-foreground hover:text-accent py-2">Home</Link>
            <Link href="/services" className="block text-foreground hover:text-accent py-2">Services</Link>
            <Link href="/car-wash" className="block text-foreground hover:text-accent py-2">Car Wash</Link>
            <Link href="/membership" className="block text-foreground hover:text-accent py-2">Membership</Link>
            <Link href="/gallery" className="block text-foreground hover:text-accent py-2">Gallery</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
