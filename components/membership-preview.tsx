import Link from 'next/link'

export default function MembershipPreview() {
  const plans = [
    {
      name: "Standard",
      price: "XXX",
      period: "/month",
      features: ["24/7 Gym Access", "Group Classes", "Locker Access"]
    },
    {
      name: "Turbo",
      price: "XXX",
      period: "/month",
      features: ["24/7 Gym Access", "Group Classes", "Personal Training (2x)", "Car Wash Discount (20%)"],
      highlight: true
    },
    {
      name: "V12 Elite",
      price: "XXX",
      period: "/month",
      features: ["24/7 Gym Access", "Unlimited Personal Training", "1 Free Car Wash/Month", "Priority Booking", "Private Lounge"]
    }
  ]

  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Membership Plans</h2>
          <p className="text-foreground/70 text-lg">Choose your performance level</p>
          <p className="text-accent text-sm mt-2">Pricing revealing soon...</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-xl p-8 border transition ${
              plan.highlight 
                ? 'bg-accent/10 border-accent scale-105' 
                : 'bg-primary/20 border-border hover:border-accent'
            }`}>
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent">{plan.price}</span>
                <span className="text-foreground/60">{plan.price === 'XXX' ? '' : '₹'}{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-foreground/80 flex items-center gap-2">
                    <span className="text-accent-yellow">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 px-4 rounded-lg font-bold transition ${
                plan.highlight
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                  : 'bg-primary/40 text-foreground hover:bg-primary/60'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/membership" className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition">
            View All Plans & Benefits →
          </Link>
        </div>
      </div>
    </section>
  )
}
