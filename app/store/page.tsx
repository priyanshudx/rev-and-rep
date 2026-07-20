'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  Info, 
  X, 
  Sparkles, 
  Flame, 
  Layers, 
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react'

// Define the product type
interface Product {
  id: string
  name: string
  price: number
  category: 'compression' | 'tops' | 'bottoms' | 'accessories'
  rating: number
  imageText: string
  bgGradient: string
  description: string
  features: string[]
  specs: {
    compressionLevel?: string
    fabric: string
    breathability: string
    bestFor: string
  }
}

// Define the cart item type
interface CartItem {
  product: Product
  size: string
  quantity: number
}

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const products: Product[] = [
    {
      id: 'p1',
      name: 'V8 Redline Compression Tee',
      price: 1899,
      category: 'compression',
      rating: 4.9,
      imageText: 'REDLINE COMPRESSION',
      bgGradient: 'from-red-600/30 to-black',
      description: 'Engineered for high-intensity power sessions. Our signature compression tee mimics muscle fibers to increase blood circulation, reduce vibration, and keep your form locked in.',
      features: [
        'Level 4 Muscle Enclosure (High compression)',
        'V8 AeroMesh underarm vents for heat dissipation',
        'Sweat-wicking hydrophobic fibers',
        'Anti-chafing flatlock seams'
      ],
      specs: {
        compressionLevel: 'Extreme (High)',
        fabric: '85% Recycled Polyester, 15% Spandex',
        breathability: 'Excellent (Mesh Panels)',
        bestFor: 'Powerlifting, High Intensity Interval Training (HIIT)'
      }
    },
    {
      id: 'p2',
      name: 'TurboFit Hyper-Knit Long Sleeve',
      price: 2499,
      category: 'compression',
      rating: 4.8,
      imageText: 'TURBOFIT LS',
      bgGradient: 'from-amber-500/20 to-black',
      description: 'Full-length arm coverage designed to maintain optimal muscle temperatures. Offers thermal regulation and helps reduce micro-tears during heavy pulling exercises.',
      features: [
        'Graduated wrist-to-shoulder compression',
        'Thermal regulating brushed lining',
        'Dual-grip silicone waist hem to prevent ride-up',
        'Reflective speed strips on sleeves'
      ],
      specs: {
        compressionLevel: 'Medium-High',
        fabric: '80% Nylon, 20% Elastane',
        breathability: 'Thermoregulating',
        bestFor: 'Cold Weather Training, Deadlifts & Olympic Lifts'
      }
    },
    {
      id: 'p3',
      name: 'Piston Core Raw Tank',
      price: 1299,
      category: 'tops',
      rating: 4.7,
      imageText: 'PISTON TANK',
      bgGradient: 'from-zinc-700/30 to-black',
      description: 'Cut deep for absolute shoulder mobility. Crafted with lightweight, breathable cotton-modal blend that drapes perfectly and feels weightless.',
      features: [
        'Deep-cut armholes for maximum shoulder rotation',
        'Raw hem finish for vintage aesthetic',
        'Anti-odor silver ion treatment',
        'High moisture absorption'
      ],
      specs: {
        fabric: '60% Organic Cotton, 40% Modal',
        breathability: 'Maximum',
        bestFor: 'Bodybuilding, High-Volume Shoulder/Back workouts'
      }
    },
    {
      id: 'p4',
      name: 'Octane Vented Gym Shorts',
      price: 1599,
      category: 'bottoms',
      rating: 4.6,
      imageText: 'OCTANE SHORTS',
      bgGradient: 'from-neutral-800 to-black',
      description: 'Double-layer performance shorts featuring a built-in compression liner that secures your phone and keeps your quads supported while sprinting or squatting.',
      features: [
        'Integrated 5-inch compression phone pocket liner',
        '4-way stretch ripstop outer shell',
        'Laser-cut ventilation holes at the back',
        'Quick-cinch drawcord waistband'
      ],
      specs: {
        compressionLevel: 'Light (Liner only)',
        fabric: 'Shell: 90% Polyester / Liner: 85% Nylon',
        breathability: 'High',
        bestFor: 'Squats, Agility Drills, Daily Workouts'
      }
    },
    {
      id: 'p5',
      name: 'RPM Heavyweight Hoodie',
      price: 2999,
      category: 'tops',
      rating: 4.9,
      imageText: 'RPM HOODIE',
      bgGradient: 'from-accent/20 to-black',
      description: 'Premium heavy-duty pump cover. Built with 450GSM French Terry cotton to trap heat before workouts and keep you looking sleek on the street.',
      features: [
        'Ultra-thick 450GSM combed cotton',
        'Double-layered hood with structural cross-neck',
        'Embossed matte Rev & Rep chest graphic',
        'Oversized drop-shoulder streetwear fit'
      ],
      specs: {
        fabric: '100% French Terry Cotton',
        breathability: 'Medium (Warmth focus)',
        bestFor: 'Pre-workout Warmups, Lifestyle Wear'
      }
    },
    {
      id: 'p6',
      name: 'Rev-Grip Lifting Straps (Pair)',
      price: 799,
      category: 'accessories',
      rating: 4.8,
      imageText: 'REV-GRIP STRAPS',
      bgGradient: 'from-yellow-600/20 to-black',
      description: 'Heavy duty webbed cotton lifting straps reinforced with rubberized tire-tread grip strips for unbeatable bar traction on heavy lifts.',
      features: [
        'Rubber tire-tread design on cotton webbing',
        'Neoprene wrist padding for extra comfort',
        'Reinforced stitching for loads up to 350kg',
        'Standard 22-inch length'
      ],
      specs: {
        fabric: 'Heavy-Duty Cotton with Silicone Grip',
        breathability: 'N/A',
        bestFor: 'Heavy Deadlifts, Rows, Shrugs'
      }
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const addToCart = (product: Product) => {
    const size = selectedSizes[product.id] || 'M'
    
    // Check if item with same id and size exists
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size)

    if (existingIndex > -1) {
      const updated = [...cart]
      updated[existingIndex].quantity += 1
      setCart(updated)
    } else {
      setCart([...cart, { product, size, quantity: 1 }])
    }
    
    setIsCartOpen(true)
  }

  const updateQuantity = (index: number, change: number) => {
    const updated = [...cart]
    const newQty = updated[index].quantity + change
    if (newQty <= 0) {
      updated.splice(index, 1)
    } else {
      updated[index].quantity = newQty
    }
    setCart(updated)
  }

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)

  const handleCheckout = () => {
    setCheckoutSuccess(true)
    setTimeout(() => {
      setCart([])
      setCheckoutSuccess(false)
      setIsCartOpen(false)
    }, 2500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-border carbon-fiber">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> New Performance Gear Drop
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                REP THE <span className="text-accent">LIMITS</span> IN STYLE
              </h1>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Elevate your workouts with our ultra-engineered compression gear and active apparel. Designed for maximum muscle output, blood flow, and durability.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#catalog"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-lg flex items-center gap-2 group transition"
                >
                  Shop Compression Wear 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-primary/30 border border-border hover:border-accent text-foreground px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition"
                >
                  <ShoppingBag className="w-5 h-5" /> View Cart ({cart.length})
                </button>
              </div>
            </div>

            {/* Display Feature Cards */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-[450px]">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent transition group">
                <Activity className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">Muscle Control</h3>
                <p className="text-sm text-foreground/60">Optimized fit reduces vibration & fatigue.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent transition group">
                <Flame className="w-8 h-8 text-accent-yellow mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">DryTech Fibers</h3>
                <p className="text-sm text-foreground/60">Hydrophobic yarn drives moisture out instantly.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent transition group col-span-2">
                <div className="flex items-center gap-3">
                  <Layers className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="font-bold text-lg">Anti-Slip Tech</h3>
                    <p className="text-sm text-foreground/60">Dual silicone linings prevent top ride-up.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Rev & Rep Gear Catalog</h2>
              <p className="text-foreground/60">Filter by performance category to gear up for your next session.</p>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'compression', 'tops', 'bottoms', 'accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase transition ${
                    selectedCategory === cat
                      ? 'bg-accent text-accent-foreground shadow-md'
                      : 'bg-primary/20 hover:bg-primary/40 text-foreground/80'
                  }`}
                >
                  {cat === 'all' ? 'All Gear' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const selectedSize = selectedSizes[product.id] || 'M'
              return (
                <div 
                  key={product.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition duration-300 flex flex-col group"
                >
                  {/* Mock Image Display */}
                  <div className={`h-64 bg-gradient-to-br ${product.bgGradient} flex items-center justify-center p-6 relative overflow-hidden border-b border-border`}>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-xs px-2 py-1 rounded font-bold border border-border/40 text-accent-yellow">
                      ★ {product.rating}
                    </div>
                    {product.category === 'compression' && (
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-2 py-1 rounded font-black flex items-center gap-1 shadow">
                        <Zap className="w-3 h-3 fill-current" /> GEAR
                      </div>
                    )}
                    <span className="font-extrabold text-2xl tracking-widest text-center text-white/95 group-hover:scale-105 transition-transform duration-300 pointer-events-none drop-shadow-lg">
                      {product.imageText}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-bold text-xl group-hover:text-accent transition duration-200">{product.name}</h3>
                      <span className="text-xl font-extrabold text-accent flex-shrink-0">₹{product.price}</span>
                    </div>
                    <p className="text-foreground/70 text-sm mb-6 flex-grow line-clamp-2">{product.description}</p>
                    
                    {/* Size Selector */}
                    {product.category !== 'accessories' && (
                      <div className="mb-6">
                        <span className="text-xs text-foreground/50 block font-bold mb-2">SELECT SIZE</span>
                        <div className="flex gap-2">
                          {['S', 'M', 'L', 'XL'].map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleSizeSelect(product.id, sz)}
                              className={`w-9 h-9 text-xs rounded border flex items-center justify-center font-bold transition ${
                                selectedSize === sz
                                  ? 'border-accent bg-accent/15 text-accent font-extrabold'
                                  : 'border-border hover:border-foreground/45 text-foreground/75'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </button>
                      <button
                        onClick={() => setSelectedProductForModal(product)}
                        className="bg-primary/20 hover:bg-primary/45 border border-border/80 hover:border-accent/40 px-3.5 rounded-lg flex items-center justify-center transition text-foreground"
                        title="Specs & details"
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Stats Banner */}
      <section className="bg-card border-t border-b border-border py-16 carbon-fiber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <ShieldCheck className="w-10 h-10 text-accent mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Premium Materials</h4>
            <p className="text-sm text-foreground/60">Built to withstand friction, sweat, and heavy wear, with reinforced stitching.</p>
          </div>
          <div className="p-6">
            <Activity className="w-10 h-10 text-accent mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Ergonomic Fit</h4>
            <p className="text-sm text-foreground/60">Compression mapping mimics muscle alignment to help speed up recovery.</p>
          </div>
          <div className="p-6">
            <Zap className="w-10 h-10 text-accent-yellow mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Member Discounts</h4>
            <p className="text-sm text-foreground/60">Turbo and V12 Elite members receive up to 20% off all apparel purchases.</p>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full hover:bg-black/80 text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className={`p-8 bg-gradient-to-br ${selectedProductForModal.bgGradient} border-b border-border relative`}>
              <span className="text-xs uppercase bg-accent text-accent-foreground font-black tracking-widest px-2.5 py-1 rounded mb-3 inline-block">
                {selectedProductForModal.category}
              </span>
              <h3 className="text-3xl font-extrabold text-white">{selectedProductForModal.name}</h3>
              <p className="text-accent-yellow font-black text-2xl mt-2">₹{selectedProductForModal.price}</p>
            </div>
            
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6">
              <div>
                <h4 className="text-sm font-bold text-foreground/50 uppercase mb-2">Product Overview</h4>
                <p className="text-foreground/80 leading-relaxed text-sm">{selectedProductForModal.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground/50 uppercase mb-3">Key Features & Engineering</h4>
                <ul className="space-y-2.5">
                  {selectedProductForModal.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-foreground/85">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-foreground/50 font-bold uppercase mb-0.5">Fabric Composition</span>
                  <span className="text-foreground font-semibold">{selectedProductForModal.specs.fabric}</span>
                </div>
                <div>
                  <span className="block text-xs text-foreground/50 font-bold uppercase mb-0.5">Best Suited For</span>
                  <span className="text-foreground font-semibold">{selectedProductForModal.specs.bestFor}</span>
                </div>
                {selectedProductForModal.specs.compressionLevel && (
                  <div>
                    <span className="block text-xs text-foreground/50 font-bold uppercase mb-0.5">Compression Level</span>
                    <span className="text-accent font-extrabold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current" /> {selectedProductForModal.specs.compressionLevel}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-xs text-foreground/50 font-bold uppercase mb-0.5">Breathability Rating</span>
                  <span className="text-foreground font-semibold">{selectedProductForModal.specs.breathability}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/20 border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setSelectedProductForModal(null)}
                className="px-5 py-2.5 bg-transparent border border-border hover:bg-white/5 rounded-lg text-sm font-bold transition"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  addToCart(selectedProductForModal)
                  setSelectedProductForModal(null)
                }}
                className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-sm font-bold transition flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart (₹{selectedProductForModal.price})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sliding Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-card border-l border-border flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-accent" /> Your Gear Bag
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-primary/40 rounded-full text-foreground/75 hover:text-foreground transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {checkoutSuccess ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent border border-accent/40 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-accent">Order Confirmed!</h4>
                    <p className="text-sm text-foreground/60 max-w-xs mx-auto">
                      Your performance apparel order has been placed. You can pick it up at the Gym Front Desk!
                    </p>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-20 text-foreground/50 space-y-4">
                    <ShoppingBag className="w-16 h-16 mx-auto stroke-1" />
                    <p className="text-lg font-semibold">Your bag is empty</p>
                    <p className="text-sm max-w-xs mx-auto text-foreground/40">Add items from the catalog above to get started with your high-performance look.</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}`} className="bg-primary/10 border border-border/80 rounded-xl p-4 flex gap-4">
                      {/* Thumbnail mockup */}
                      <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${item.product.bgGradient} flex items-center justify-center flex-shrink-0 text-[8px] font-black text-center text-white/80 overflow-hidden`}>
                        {item.product.imageText}
                      </div>

                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-sm text-foreground/90 line-clamp-1">{item.product.name}</h4>
                            <span className="font-extrabold text-accent text-sm flex-shrink-0">₹{item.product.price * item.quantity}</span>
                          </div>
                          <span className="inline-block text-[10px] font-black bg-white/5 border border-border/60 rounded px-1.5 py-0.5 text-foreground/70 mt-1">
                            SIZE: {item.size}
                          </span>
                        </div>

                        {/* Adjust Qty */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(index, -1)}
                              className="px-2 py-1 bg-primary/20 hover:bg-primary/45 transition text-foreground"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 text-sm font-bold bg-black/20 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(index, 1)}
                              className="px-2 py-1 bg-primary/20 hover:bg-primary/45 transition text-foreground"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => updateQuantity(index, -item.quantity)}
                            className="text-xs text-red-400 hover:text-red-300 font-bold transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && !checkoutSuccess && (
                <div className="p-6 border-t border-border bg-primary/10">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-foreground/60 text-sm">
                      <span>Bag Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-foreground/60 text-sm">
                      <span>Est. GST / Taxes</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-lg">
                      <span>Total Price</span>
                      <span className="text-accent">₹{cartTotal}</span>
                    </div>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-2.5 text-xs text-accent flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>You earn <strong>{Math.floor(cartTotal / 10)} RPM Points</strong> with this purchase!</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    Confirm Gym Pickup & Pay <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-center text-foreground/45 mt-3">
                    Items are reserved for pickup at the Rev & Rep Front Desk for 48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}