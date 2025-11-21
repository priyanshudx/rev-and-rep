'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { CheckCircle, Lock } from 'lucide-react'

export default function Membership() {
  const plans = [
    {
      name: "Standard",
      price: "XXX",
      period: "/month",
      description: "Perfect for casual fitness enthusiasts",
      features: [
        "24/7 Gym Access",
        "All Equipment & Facilities",
        "Group Classes",
        "Locker Access",
        "Water & Towel Service"
      ]
    },
    {
      name: "Turbo",
      price: "XXX",
      period: "/month",
      description: "For committed performance athletes",
      features: [
        "Everything in Standard",
        "Personal Training (2x/month)",
        "20% Car Wash Discount",
        "Priority Class Booking",
        "Monthly Nutrition Consultation",
        "Member-Only Events"
      ],
      highlight: true
    },
    {
      name: "V12 Elite",
      price: "XXX",
      period: "/month",
      description: "Ultimate performance package",
      features: [
        "Everything in Turbo",
        "Unlimited Personal Training",
        "1 Free Car Wash/Month",
        "Private Training Studio",
        "Priority Queue Access",
        "Private Lounge",
        "Performance Analysis",
        "Guest Privileges (2x/month)"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Membership Plans</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">Find your perfect performance level and join the Rev & Rep community.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, idx) => (
              <div key={idx} className={`rounded-xl p-8 border transition ${
                plan.highlight
                  ? 'bg-accent/10 border-accent scale-105 md:scale-110'
                  : 'bg-primary/20 border-border hover:border-accent'
              }`}>
                {plan.highlight && <div className="text-accent-yellow font-bold text-sm mb-4">MOST POPULAR</div>}
                <h3 className="text-3xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-accent">{plan.price}</span>
                  <span className="text-foreground/60">{plan.price === 'XXX' ? '' : '₹'}{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-foreground/80 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-yellow mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-4 rounded-lg font-bold transition ${
                  plan.highlight
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-primary/40 text-foreground hover:bg-primary/60'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-12">
            <h3 className="text-2xl font-bold text-foreground mb-8">What's Included</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Tire-shaped equipment & barbells",
                "State-of-the-art cardio machines",
                "Automotive-themed training environment",
                "Professional coaching & guidance",
                "Car wash service integration",
                "Community events & challenges",
                "Performance tracking tools",
                "Flexible membership terms"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-accent-yellow flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
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
