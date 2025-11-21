'use client'

import { useState } from 'react'
import { Car, X } from 'lucide-react'

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 z-40 flex items-center gap-2"
      >
        <Car className="w-5 h-5" />
        Book Your Wash
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-foreground">Book a Car Wash</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-foreground/70 mb-6">Schedule your wash for your next workout session.</p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-primary/20 border border-border rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full bg-primary/20 border border-border rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
              />
              <select className="w-full bg-primary/20 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent">
                <option>Select time slot</option>
                <option>9:00 AM - 10:00 AM</option>
                <option>2:00 PM - 3:00 PM</option>
                <option>6:00 PM - 7:00 PM</option>
              </select>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-primary/40 hover:bg-primary/60 text-foreground font-bold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 rounded-lg transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
