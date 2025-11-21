'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Dumbbell, Users, Waves, Apple, Wind, Calendar } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: "24/7 Gym Access",
      description: "Round-the-clock access to our state-of-the-art facility with tire-shaped equipment and automotive-inspired design.",
      Icon: Dumbbell
    },
    {
      title: "Personal Training",
      description: "1-on-1 coaching from certified trainers who understand performance, power, and precision.",
      Icon: Dumbbell
    },
    {
      title: "Group Classes",
      description: "High-energy classes like Turbo Burn, V8 Strength, and RPM Cardio led by elite instructors.",
      Icon: Users
    },
    {
      title: "Car Wash Service",
      description: "Professional car wash available during your workout. Premium detailing packages available.",
      Icon: Waves
    },
    {
      title: "Nutrition Coaching",
      description: "Personalized meal plans and nutrition guidance to fuel your performance.",
      Icon: Apple
    },
    {
      title: "Recovery Services",
      description: "Massage therapy, stretching sessions, and recovery pods to optimize your fitness gains.",
      Icon: Wind
    }
  ]

  const classes = [
    {
      name: "Turbo Burn",
      description: "30-min high-intensity interval training",
      schedule: "Mon, Wed, Fri - 6:00 AM, 6:00 PM"
    },
    {
      name: "V8 Strength",
      description: "45-min power lifting and conditioning",
      schedule: "Tue, Thu, Sat - 7:00 AM, 5:30 PM"
    },
    {
      name: "RPM Cardio",
      description: "45-min cycling and cardio circuit",
      schedule: "Daily - 9:00 AM, 12:00 PM, 6:30 PM"
    },
    {
      name: "Speed & Agility",
      description: "Performance drills and functional training",
      schedule: "Mon, Wed, Fri - 5:00 PM"
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">Everything you need to rev your engine and rep your limits.</p>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, idx) => {
              const Icon = service.Icon
              return (
                <div key={idx} className="bg-primary/20 border border-border rounded-xl p-8 hover:border-accent transition">
                  <Icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Car-Themed Performance Classes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {classes.map((cls, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-8 hover:border-accent transition">
                <h3 className="text-2xl font-bold text-accent mb-2">{cls.name}</h3>
                <p className="text-foreground/70 mb-4">{cls.description}</p>
                <p className="text-foreground/60 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {cls.schedule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
