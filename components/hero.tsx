'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/gym-car-fusion-hero.jpg" 
          alt="Rev & Rep gym-car fusion background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Speed line animation */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 animate-speed-lines" />
        <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-30 animate-speed-lines" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
          {/* Left content */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-4">
              <span className="text-foreground">Rev Your </span>
              <span className="text-accent">Engine</span>
              <span className="text-foreground">.</span>
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-8">
              <span className="text-foreground">Rep Your </span>
              <span className="text-accent-yellow">Limits</span>
              <span className="text-foreground">.</span>
            </h1>
            <p className="text-foreground/70 text-lg mb-8 max-w-md">
              India's premier automotive-themed fitness destination. Experience tire-shaped equipment, blazing-fast workouts, and wash your car while you train.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 flex items-center gap-2">
              <span>Join the Race →</span>
            </button>
          </div>

          {/* Right visual */}
          <div className={`relative h-[500px] transform transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-yellow/10 rounded-2xl blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              {/* Tire dumbbell visualization */}
              
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-border">
          <div className="text-center">
            
            
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-yellow">24/7</div>
            <div className="text-foreground/60 text-sm">Access</div>
          </div>
          <div className="text-center">
            
            
          </div>
        </div>
      </div>
    </section>
  )
}
