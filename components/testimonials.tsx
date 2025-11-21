export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Professional Racer",
      text: "Finally, a gym that understands the automotive lifestyle. The equipment design is genius.",
      avatar: "AM"
    },
    {
      name: "Jordan Chen",
      role: "Fitness Coach",
      text: "Rev & Rep combines functionality with style in a way I've never seen. Members love it.",
      avatar: "JC"
    },
    {
      name: "Taylor Rodriguez",
      role: "Car Enthusiast",
      text: "Getting a fresh wash while I PR my deadlifts? This place is unreal. Best investment ever.",
      avatar: "TR"
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">What Our Members Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-8 hover:border-accent transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-accent-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/70 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
