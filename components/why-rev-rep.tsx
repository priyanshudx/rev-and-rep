export default function WhyRevRep() {
  const features = [
    {
      title: "Tire-Shaped Equipment",
      description: "Revolutionary tire-designed dumbbells and weights for unique grip and training experience.",
      icon: "⭕"
    },
    {
      title: "Car Wash While You Train",
      description: "Book a wash during your workout. Your car is ready when you finish your final rep.",
      icon: "🚗"
    },
    {
      title: "Performance Classes",
      description: "Turbo Burn, V8 Strength, and High-RPM cardio sessions designed for speed and power.",
      icon: "⚡"
    },
    {
      title: "Garage Aesthetics",
      description: "Train in a luxury automotive garage with racing lights, carbon-fiber finishes, and speed vibes.",
      icon: "🏁"
    }
  ]

  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Rev & Rep India?</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            India's first automotive-gym fusion concept. We merged racing passion with elite fitness to create an unmatched experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-primary/20 border border-border rounded-xl p-8 hover:border-accent transition group cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
