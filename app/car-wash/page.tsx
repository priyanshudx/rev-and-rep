'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useState } from 'react'
import { Droplets, Clock, Zap } from 'lucide-react'

export default function CarWash() {
  const [queuePosition, setQueuePosition] = useState(null)

  const packages = [
    {
      name: "Express Wash",
      price: "XXX",
      duration: "15 min",
      features: ["Exterior wash", "Wheel cleaning", "Quick dry"]
    },
    {
      name: "Premium Wash",
      price: "XXX",
      duration: "25 min",
      features: ["Exterior wash", "Interior vacuum", "Wheel deep clean", "Tire shine"],
      popular: true
    },
    {
      name: "Elite Detail",
      price: "XXX",
      duration: "45 min",
      features: ["Full exterior detail", "Interior deep clean", "Wax treatment", "Glass coat", "Engine bay cleaning"]
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Wash While You Workout</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">Get your car pristine while you crush your fitness goals.</p>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Real-Time Queue Status</h2>
          <div className="bg-primary/20 border border-border rounded-xl p-12 text-center">
            <div className="text-6xl font-bold text-accent mb-4">4</div>
            <p className="text-2xl text-foreground mb-2">Cars in Queue</p>
            <p className="text-foreground/70 mb-8">Average wait time: 12 minutes</p>
            <button
              onClick={() => setQueuePosition(Math.floor(Math.random() * 3) + 1)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-lg transition"
            >
              Join Queue
            </button>
            {queuePosition && (
              <p className="text-accent mt-4">You are position #{queuePosition + 4} in queue</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Wash Packages</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`rounded-xl p-8 border transition ${
                pkg.popular
                  ? 'bg-accent/10 border-accent scale-105'
                  : 'bg-primary/20 border-border hover:border-accent'
              }`}>
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-accent">{pkg.price}</span>
                  <span className="text-foreground/60 text-sm ml-2">{pkg.price === 'XXX' ? '' : '₹'}</span>
                  <span className="text-foreground/60 text-sm ml-2">{pkg.duration}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-foreground/80 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent-yellow" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 px-4 rounded-lg font-bold transition ${
                  pkg.popular
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-primary/40 text-foreground hover:bg-primary/60'
                }`}>
                  Book Package
                </button>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: "Check In", desc: "Start your workout" },
                { step: 2, title: "Select Package", desc: "Choose your wash level" },
                { step: 3, title: "Join Queue", desc: "Get in line when ready" },
                { step: 4, title: "Enjoy Clean Car", desc: "Pick up after workout" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-accent-foreground mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-foreground/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
