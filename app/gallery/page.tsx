'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function Gallery() {
  const galleryItems = [
    { title: "Tire Dumbbells", category: "Equipment", icon: "⭕" },
    { title: "Racing-Style Lighting", category: "Facility", icon: "💡" },
    { title: "Weight Racks", category: "Equipment", icon: "⚙️" },
    { title: "Cardio Area", category: "Facility", icon: "🚴" },
    { title: "Car Wash Bay", category: "Services", icon: "🚗" },
    { title: "Lounge Area", category: "Facility", icon: "🛋️" }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Gallery</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">Experience the Rev & Rep facility and equipment.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="bg-primary/20 border border-border rounded-xl overflow-hidden hover:border-accent transition group cursor-pointer">
                <div className="h-64 bg-gradient-to-br from-accent/20 to-accent-yellow/10 flex items-center justify-center group-hover:scale-110 transition">
                  <span className="text-8xl">{item.icon}</span>
                </div>
                <div className="p-6">
                  <p className="text-accent-yellow text-sm font-bold mb-1">{item.category}</p>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
