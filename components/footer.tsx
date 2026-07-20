import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">REV & REP</h3>
            <p className="text-foreground/60 text-sm">Performance Gym & Car Wash</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
              <li><Link href="/car-wash" className="hover:text-accent transition">Car Wash</Link></li>
              <li><Link href="/store" className="hover:text-accent transition">Store</Link></li>
              <li><Link href="/restaurant" className="hover:text-accent transition">Fuel Station</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
              <li><Link href="/membership" className="hover:text-accent transition">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Follow</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="https://www.instagram.com/revandrep.official_?igsh=MWV3czYwb3Z0NjhjZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition">YouTube</a></li>
              <li><a href="#" className="hover:text-accent transition">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; 2025 Rev & Rep. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
