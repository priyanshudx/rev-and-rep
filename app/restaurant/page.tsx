'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { 
  Apple, 
  Flame, 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  ShoppingCart, 
  Activity, 
  ChevronRight, 
  X,
  Scale,
  UtensilsCrossed,
  Droplet
} from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  price: number
  calories: number
  protein: number
  carbs: number
  fat: number
  category: 'shred' | 'bulk' | 'recovery'
  description: string
  tag: string
}

interface CustomIngredient {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  price: number
}

export default function Restaurant() {
  const [selectedGoal, setSelectedGoal] = useState<string>('all')
  const [order, setOrder] = useState<{ item: any; quantity: number; isCustom?: boolean }[]>([])
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Custom Bowl Builder State
  const [customBase, setCustomBase] = useState<string>('Quinoa')
  const [customProtein, setCustomProtein] = useState<string>('Tandoori Grilled Chicken')
  const [customVeggies, setCustomVeggies] = useState<string[]>(['Steamed Broccoli'])
  const [customSauce, setCustomSauce] = useState<string>('Mint Coriander Chutney')

  // Menu items list
  const menuItems: MenuItem[] = [
    {
      id: 'm1',
      name: 'Tandoori Chicken Tikka Salad',
      price: 499,
      calories: 380,
      protein: 42,
      carbs: 12,
      fat: 8,
      category: 'shred',
      description: 'Clay-oven spiced lean tandoori chicken tikka pieces served over baby spinach, red onions, cucumbers, and tomatoes with a splash of fresh lemon juice.',
      tag: 'Keto Chicken'
    },
    {
      id: 'm2',
      name: 'High-Octane Chicken Tikka Rice Bowl',
      price: 549,
      calories: 680,
      protein: 48,
      carbs: 85,
      fat: 14,
      category: 'bulk',
      description: 'Double portion of roasted chicken tikka served with brown basmati rice, seasoned yellow lentils (dal), roasted carrots, and a mint yoghurt drizzle.',
      tag: 'Bulking Classic'
    },
    {
      id: 'm3',
      name: 'V12 Lean Mutton Keema Quinoa',
      price: 699,
      calories: 740,
      protein: 54,
      carbs: 58,
      fat: 20,
      category: 'bulk',
      description: 'A premium lean minced mutton (keema) slow cooked with Indian spices, served with organic white quinoa, sautéed mushrooms, and grilled asparagus.',
      tag: 'High Protein Mutton'
    },
    {
      id: 'm4',
      name: 'Redline Masala Egg White Omelet',
      price: 399,
      calories: 290,
      protein: 32,
      carbs: 6,
      fat: 5,
      category: 'shred',
      description: 'Three egg whites whipped with onions, green chilies, tomatoes, and fresh coriander, served with a side of sliced avocado.',
      tag: 'Low Carb Egg'
    },
    {
      id: 'm5',
      name: 'Piston Badam Milk Protein Shake',
      price: 349,
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 12,
      category: 'recovery',
      description: 'Rev & Rep special almond-saffron protein milk shake containing whey isolate, crushed almonds, cardamom, and ashwagandha extract.',
      tag: 'Dairy Recovery'
    },
    {
      id: 'm6',
      name: 'E-Charger Soya Keema Veg Bowl',
      price: 429,
      calories: 420,
      protein: 34,
      carbs: 48,
      fat: 10,
      category: 'recovery',
      description: 'Protein-packed soya chunks minced in a light bhurji masala style, served with quinoa, green peas, and steamed baby kale.',
      tag: 'Veg Muscle'
    },
    {
      id: 'm7',
      name: 'Tandoori Paneer Tikka Salad',
      price: 449,
      calories: 390,
      protein: 28,
      carbs: 18,
      fat: 24,
      category: 'shred',
      description: 'Grilled high-protein paneer cubes seasoned with Indian dry spices, layered with cucumber slices, cherry tomatoes, and bell peppers.',
      tag: 'Veg Tikka'
    },
    {
      id: 'm8',
      name: 'Whey Kesar Pista Lassi',
      price: 299,
      calories: 310,
      protein: 26,
      carbs: 35,
      fat: 6,
      category: 'recovery',
      description: 'Traditional thick curd lassi infused with saffron (kesar), pistachios (pista), and a scoop of unflavored whey protein isolate.',
      tag: 'High Protein Lassi'
    },
    {
      id: 'm9',
      name: 'Golden Recovery Haldi Doodh',
      price: 249,
      calories: 180,
      protein: 12,
      carbs: 15,
      fat: 8,
      category: 'recovery',
      description: 'Warm low-fat cow milk infused with fresh turmeric, black pepper (for curcumin absorption), ginger, and ashwagandha.',
      tag: 'Anti-Inflammatory Milk'
    }
  ]

  // Ingredient list for Custom Bowl Builder
  const bases: Record<string, CustomIngredient> = {
    'Quinoa': { name: 'Organic Quinoa', calories: 140, protein: 5, carbs: 25, fat: 2, price: 90 },
    'Brown Basmati Rice': { name: 'Brown Basmati Rice', calories: 160, protein: 4, carbs: 32, fat: 1, price: 70 },
    'Masala Oats Mash': { name: 'Masala Oats Mash', calories: 130, protein: 3, carbs: 27, fat: 1.5, price: 80 },
    'Spinach & Kale': { name: 'Spinach & Kale Base', calories: 35, protein: 2, carbs: 4, fat: 0, price: 60 }
  }

  const proteins: Record<string, CustomIngredient> = {
    'Tandoori Grilled Chicken': { name: 'Tandoori Chicken (150g)', calories: 180, protein: 35, carbs: 0, fat: 4, price: 150 },
    'Lean Mutton Keema': { name: 'Lean Mutton Keema (120g)', calories: 240, protein: 30, carbs: 0, fat: 14, price: 200 },
    'High-Protein Paneer Tikka': { name: 'Paneer Tikka (150g)', calories: 260, protein: 22, carbs: 4, fat: 18, price: 120 },
    'Soya Chunks Masala': { name: 'Soya Chunks Masala (150g)', calories: 150, protein: 26, carbs: 8, fat: 2, price: 90 }
  }

  const veggies: Record<string, CustomIngredient> = {
    'Steamed Broccoli': { name: 'Steamed Broccoli', calories: 35, protein: 3, carbs: 6, fat: 0, price: 40 },
    'Avocado Slices': { name: 'Avocado Slices', calories: 120, protein: 1.5, carbs: 6, fat: 11, price: 70 },
    'Sautéed Mushrooms': { name: 'Sautéed Mushrooms', calories: 45, protein: 2, carbs: 5, fat: 2.5, price: 50 },
    'Masala Boiled Eggs': { name: 'Masala Boiled Eggs', calories: 75, protein: 6, carbs: 0.5, fat: 5, price: 30 }
  }

  const sauces: Record<string, CustomIngredient> = {
    'Mint Coriander Chutney': { name: 'Mint Coriander Chutney', calories: 20, protein: 1, carbs: 2, fat: 0, price: 30 },
    'Spicy Peanut Salan': { name: 'Spicy Peanut Salan', calories: 90, protein: 3, carbs: 5, fat: 7, price: 30 },
    'Masala Raita': { name: 'Masala Spiced Raita', calories: 40, protein: 3, carbs: 4, fat: 1, price: 30 },
    'Tomato Makhani Dressing': { name: 'Tomato Makhani Dressing', calories: 60, protein: 1, carbs: 5, fat: 4, price: 30 }
  }

  // Calculate Custom Bowl Macros
  const getCustomBowlMacros = () => {
    const base = bases[customBase]
    const protein = proteins[customProtein]
    const veggieList = customVeggies.map(v => veggies[v])
    const sauce = sauces[customSauce]

    let calories = base.calories + protein.calories + sauce.calories
    let prot = base.protein + protein.protein + sauce.protein
    let carb = base.carbs + protein.carbs + sauce.carbs
    let fat = base.fat + protein.fat + sauce.fat
    let price = 100 + base.price + protein.price + sauce.price // Base assembly cost + ingredients

    veggieList.forEach(v => {
      calories += v.calories
      prot += v.protein
      carb += v.carbs
      fat += v.fat
      price += v.price
    })

    return { calories, protein: Math.round(prot), carbs: Math.round(carb), fat: Math.round(fat), price }
  }

  const customBowlData = getCustomBowlMacros()

  const handleVeggieToggle = (vegName: string) => {
    if (customVeggies.includes(vegName)) {
      if (customVeggies.length > 1) { // keep at least one veggie
        setCustomVeggies(customVeggies.filter(v => v !== vegName))
      }
    } else {
      if (customVeggies.length < 3) { // max 3 veggies
        setCustomVeggies([...customVeggies, vegName])
      }
    }
  }

  const addToOrder = (item: any, isCustom = false) => {
    const existingIndex = order.findIndex(o => {
      if (isCustom && o.isCustom) {
        // Compare custom configurations
        return o.item.base === item.base && 
               o.item.protein === item.protein && 
               JSON.stringify(o.item.veggies) === JSON.stringify(item.veggies) &&
               o.item.sauce === item.sauce
      }
      return !isCustom && !o.isCustom && o.item.id === item.id
    })

    if (existingIndex > -1) {
      const updated = [...order]
      updated[existingIndex].quantity += 1
      setOrder(updated)
    } else {
      setOrder([...order, { item, quantity: 1, isCustom }])
    }
    setIsOrderDrawerOpen(true)
  }

  const updateQuantity = (index: number, change: number) => {
    const updated = [...order]
    const newQty = updated[index].quantity + change
    if (newQty <= 0) {
      updated.splice(index, 1)
    } else {
      updated[index].quantity = newQty
    }
    setOrder(updated)
  }

  const handleCustomBowlAdd = () => {
    const item = {
      name: 'Custom Fuel Bowl',
      base: customBase,
      protein: customProtein,
      veggies: [...customVeggies],
      sauce: customSauce,
      price: customBowlData.price,
      calories: customBowlData.calories,
      proteinGrams: customBowlData.protein,
      carbsGrams: customBowlData.carbs,
      fatGrams: customBowlData.fat
    }
    addToOrder(item, true)
  }

  // Calculate Order Totals
  const getOrderSummary = () => {
    return order.reduce((acc, curr) => {
      const isCustom = curr.isCustom
      const price = isCustom ? curr.item.price : curr.item.price
      const calories = isCustom ? curr.item.calories : curr.item.calories
      const protein = isCustom ? curr.item.proteinGrams : curr.item.protein
      const carbs = isCustom ? curr.item.carbsGrams : curr.item.carbs
      const fat = isCustom ? curr.item.fatGrams : curr.item.fat

      acc.price += price * curr.quantity
      acc.calories += calories * curr.quantity
      acc.protein += protein * curr.quantity
      acc.carbs += carbs * curr.quantity
      acc.fat += fat * curr.quantity
      return acc
    }, { price: 0, calories: 0, protein: 0, carbs: 0, fat: 0 })
  }

  const orderSummaryData = getOrderSummary()

  // Daily target values for an active lifter
  const dailyTargets = {
    calories: 2500,
    protein: 160,
    carbs: 220,
    fat: 75
  }

  const handleCheckout = () => {
    setOrderSuccess(true)
    setTimeout(() => {
      setOrder([])
      setOrderSuccess(false)
      setIsOrderDrawerOpen(false)
    }, 2500)
  }

  const filteredMenuItems = selectedGoal === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedGoal)

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-border carbon-fiber">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-yellow/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                <Apple className="w-4 h-4 text-accent-yellow" /> Fuel Station Kitchen
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                HIGH-OCTANE <span className="text-accent-yellow">DIET FOOD</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Precision nutrition tailored for your active lifestyle. Select your goal, check your macros, or build your custom performance bowl. Clean eating that fuels your reps.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#menu"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-lg flex items-center gap-2 group transition"
                >
                  Browse Diet Menu
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#custom-builder"
                  className="bg-primary/30 border border-border hover:border-accent text-foreground px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition"
                >
                  <UtensilsCrossed className="w-5 h-5 text-accent-yellow" /> Build Custom Bowl
                </a>
              </div>
            </div>

            {/* Micro Goals Panel */}
            <div className="bg-card border border-border rounded-xl p-6 w-full md:w-[400px] space-y-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2 border-b border-border pb-3 text-accent">
                <Scale className="w-5 h-5 text-accent-yellow" /> PERFORMANCE GOALS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm bg-primary/25 p-3 rounded-lg border border-border/40">
                  <span className="font-bold text-foreground">Shred & Cut</span>
                  <span className="text-xs bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded">LOW CAL / HIGH PRO</span>
                </div>
                <div className="flex justify-between items-center text-sm bg-primary/25 p-3 rounded-lg border border-border/40">
                  <span className="font-bold text-foreground">Mass & Bulk</span>
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded">HIGH CARBS & PRO</span>
                </div>
                <div className="flex justify-between items-center text-sm bg-primary/25 p-3 rounded-lg border border-border/40">
                  <span className="font-bold text-foreground">Active Recovery</span>
                  <span className="text-xs bg-green-500/20 text-green-400 font-extrabold px-2 py-0.5 rounded">ANTI-INFLAMMATORY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Filter Menu */}
      <section id="menu" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision Meals</h2>
              <p className="text-foreground/60">Every meal is pre-logged with precise nutrition. Filter by your target fitness goals.</p>
            </div>
            
            {/* Goal Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Fuel' },
                { id: 'shred', label: 'Shred & Cut' },
                { id: 'bulk', label: 'Mass & Bulk' },
                { id: 'recovery', label: 'Active Recovery' }
              ].map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase transition ${
                    selectedGoal === goal.id
                      ? 'bg-accent-yellow text-black shadow-md'
                      : 'bg-primary/20 hover:bg-primary/40 text-foreground/80'
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredMenuItems.map((item) => (
              <div 
                key={item.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-accent-yellow/50 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded ${
                      item.category === 'shred' ? 'bg-red-500/10 text-red-400 border border-red-500/25' : 
                      item.category === 'bulk' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' :
                      'bg-green-500/10 text-green-400 border border-green-500/25'
                    }`}>
                      {item.tag}
                    </span>
                    <span className="font-extrabold text-lg text-accent-yellow">₹{item.price}</span>
                  </div>
                  <h3 className="font-bold text-xl group-hover:text-accent-yellow transition duration-200 mb-2">{item.name}</h3>
                  <p className="text-foreground/75 text-sm mb-6 leading-relaxed">{item.description}</p>
                </div>

                {/* Macro breakdown & Action */}
                <div>
                  {/* Macros Stats Panel */}
                  <div className="bg-black/35 rounded-lg p-4 border border-border/60 space-y-3 mb-6">
                    <div className="flex justify-between text-xs font-bold text-foreground/60">
                      <span>Macros Breakdown</span>
                      <span className="text-foreground font-extrabold">{item.calories} kCal</span>
                    </div>
                    
                    {/* Protein bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-red-400">Protein</span>
                        <span className="text-foreground">{item.protein}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/40 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(100, (item.protein / 60) * 100)}%` }}></div>
                      </div>
                    </div>

                    {/* Carbs bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-blue-400">Carbs</span>
                        <span className="text-foreground">{item.carbs}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/40 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (item.carbs / 100) * 100)}%` }}></div>
                      </div>
                    </div>

                    {/* Fats bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-amber-500">Fat</span>
                        <span className="text-foreground">{item.fat}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/40 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (item.fat / 30) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToOrder(item)}
                    className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-black font-extrabold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Bowl Builder Section */}
          <div id="custom-builder" className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl carbon-fiber">
            <div className="p-8 md:p-12 border-b border-border bg-gradient-to-r from-accent/15 via-transparent to-transparent">
              <div className="flex items-center gap-3 text-accent-yellow mb-3">
                <UtensilsCrossed className="w-8 h-8" />
                <span className="font-extrabold text-sm uppercase tracking-wider">Kitchen Laboratory</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-3">CUSTOM PROTEIN FUEL BOWL</h2>
              <p className="text-foreground/60 max-w-xl">Engineer your dinner to fit your exact macro targets. Choose your foundation, premium protein sources, essential micro-nutrients, and finishing glaze.</p>
            </div>

            <div className="grid lg:grid-cols-3">
              {/* Option Selectors */}
              <div className="lg:col-span-2 p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-border">
                {/* Step 1: Base */}
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-xs font-black flex items-center justify-center border border-border">1</span>
                    Select Foundation (Base)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.keys(bases).map((key) => {
                      const base = bases[key]
                      return (
                        <button
                          key={key}
                          onClick={() => setCustomBase(key)}
                          className={`p-4 rounded-xl border text-left transition ${
                            customBase === key
                              ? 'border-accent-yellow bg-accent-yellow/5'
                              : 'border-border hover:border-foreground/30 bg-primary/10'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-foreground">{base.name}</span>
                            {customBase === key && <Check className="w-4 h-4 text-accent-yellow" />}
                          </div>
                          <span className="text-xs text-foreground/50">{base.calories} cal | P: {base.protein}g | C: {base.carbs}g</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2: Protein */}
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-xs font-black flex items-center justify-center border border-border">2</span>
                    Select High-Performance Protein
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.keys(proteins).map((key) => {
                      const pro = proteins[key]
                      return (
                        <button
                          key={key}
                          onClick={() => setCustomProtein(key)}
                          className={`p-4 rounded-xl border text-left transition ${
                            customProtein === key
                              ? 'border-accent-yellow bg-accent-yellow/5'
                              : 'border-border hover:border-foreground/30 bg-primary/10'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-foreground">{pro.name}</span>
                            {customProtein === key && <Check className="w-4 h-4 text-accent-yellow" />}
                          </div>
                          <span className="text-xs text-foreground/50">{pro.calories} cal | P: {pro.protein}g | F: {pro.fat}g (+₹{pro.price})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Veggies */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-xs font-black flex items-center justify-center border border-border">3</span>
                      Add Essential Greens & Micros (Max 3)
                    </h3>
                    <span className="text-xs text-foreground/50 font-bold">{customVeggies.length}/3 selected</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.keys(veggies).map((key) => {
                      const veg = veggies[key]
                      const isSelected = customVeggies.includes(key)
                      return (
                        <button
                          key={key}
                          onClick={() => handleVeggieToggle(key)}
                          className={`p-4 rounded-xl border text-left transition ${
                            isSelected
                              ? 'border-accent-yellow bg-accent-yellow/5'
                              : 'border-border hover:border-foreground/30 bg-primary/10'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-foreground">{veg.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-accent-yellow" />}
                          </div>
                          <span className="text-xs text-foreground/50">{veg.calories} cal | P: {veg.protein}g | F: {veg.fat}g (+₹{veg.price})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 4: Sauce */}
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-xs font-black flex items-center justify-center border border-border">4</span>
                    Choose Finishing Fuel Glaze (Dressing)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.keys(sauces).map((key) => {
                      const sauce = sauces[key]
                      return (
                        <button
                          key={key}
                          onClick={() => setCustomSauce(key)}
                          className={`p-4 rounded-xl border text-left transition ${
                            customSauce === key
                              ? 'border-accent-yellow bg-accent-yellow/5'
                              : 'border-border hover:border-foreground/30 bg-primary/10'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-foreground">{sauce.name}</span>
                            {customSauce === key && <Check className="w-4 h-4 text-accent-yellow" />}
                          </div>
                          <span className="text-xs text-foreground/50">{sauce.calories} cal | P: {sauce.protein}g | F: {sauce.fat}g (+₹{sauce.price})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic Live Spec Sheet */}
              <div className="p-8 md:p-12 bg-primary/20 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl text-foreground mb-6 flex items-center gap-2 border-b border-border/80 pb-3">
                    <Activity className="w-5 h-5 text-accent-yellow" /> LIVE NUTRITION SPEC SHEET
                  </h3>
                  
                  {/* Ingredient Breakdown List */}
                  <div className="space-y-4 mb-8 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/50">Base:</span>
                      <span className="font-bold text-foreground">{bases[customBase].name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/50">Protein:</span>
                      <span className="font-bold text-foreground">{proteins[customProtein].name}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-foreground/50">Veggies:</span>
                      <div className="text-right">
                        {customVeggies.map(v => (
                          <div key={v} className="font-bold text-foreground text-xs">{veggies[v].name}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/50">Sauce:</span>
                      <span className="font-bold text-foreground">{sauces[customSauce].name}</span>
                    </div>
                  </div>

                  {/* Macros Live Feed */}
                  <div className="bg-black/40 border border-border rounded-xl p-6 space-y-4 mb-8">
                    <div className="flex justify-between items-end border-b border-border/50 pb-3">
                      <span className="text-xs text-foreground/50 font-bold uppercase">Estimated Energy</span>
                      <span className="text-3xl font-black text-accent-yellow">{customBowlData.calories} <span className="text-sm font-bold text-foreground/70">cal</span></span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-primary/30 p-2.5 rounded-lg border border-border/40">
                        <span className="block text-[10px] text-foreground/45 font-bold uppercase mb-1">PROTEIN</span>
                        <span className="text-lg font-black text-red-400">{customBowlData.protein}g</span>
                      </div>
                      <div className="bg-primary/30 p-2.5 rounded-lg border border-border/40">
                        <span className="block text-[10px] text-foreground/45 font-bold uppercase mb-1">CARBS</span>
                        <span className="text-lg font-black text-blue-400">{customBowlData.carbs}g</span>
                      </div>
                      <div className="bg-primary/30 p-2.5 rounded-lg border border-border/40">
                        <span className="block text-[10px] text-foreground/45 font-bold uppercase mb-1">FATS</span>
                        <span className="text-lg font-black text-amber-400">{customBowlData.fat}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-foreground/60 text-sm">Custom Bowl Cost</span>
                    <span className="text-2xl font-black text-accent">₹{customBowlData.price}</span>
                  </div>
                  <button
                    onClick={handleCustomBowlAdd}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
                  >
                    <Plus className="w-5 h-5" /> Add Custom Bowl to Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {order.length > 0 && (
        <button
          onClick={() => setIsOrderDrawerOpen(true)}
          className="fixed bottom-6 right-6 bg-accent-yellow text-black font-extrabold py-3.5 px-6 rounded-full flex items-center gap-2 shadow-2xl z-40 border border-black/10 hover:scale-105 transition"
        >
          <ShoppingCart className="w-5 h-5 fill-current" />
          <span>Fuel Drawer ({order.reduce((sum, o) => sum + o.quantity, 0)})</span>
        </button>
      )}

      {/* Order Summary Sliding Drawer */}
      {isOrderDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOrderDrawerOpen(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-card border-l border-border flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <UtensilsCrossed className="w-6 h-6 text-accent-yellow" /> Meal Order Summary
                </h3>
                <button 
                  onClick={() => setIsOrderDrawerOpen(false)}
                  className="p-2 hover:bg-primary/40 rounded-full text-foreground/75 hover:text-foreground transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Order List */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {orderSuccess ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto text-accent-yellow border border-accent-yellow/40 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-accent-yellow">Order Sent to Fuel Bar!</h4>
                    <p className="text-sm text-foreground/60 max-w-xs mx-auto">
                      Your high-octane meal is being prepared. Grab a seat in the lounge or pick it up after your reps!
                    </p>
                  </div>
                ) : order.length === 0 ? (
                  <div className="text-center py-20 text-foreground/50 space-y-4">
                    <UtensilsCrossed className="w-16 h-16 mx-auto stroke-1" />
                    <p className="text-lg font-semibold">No food selected</p>
                    <p className="text-sm max-w-xs mx-auto text-foreground/45">Pick some healthy meals from our goal-focused menu or build your own custom protein bowl to power up.</p>
                  </div>
                ) : (
                  order.map((itemObj, index) => {
                    const isCustom = itemObj.isCustom
                    const name = isCustom ? 'Custom Fuel Bowl' : itemObj.item.name
                    const price = isCustom ? itemObj.item.price : itemObj.item.price
                    const calories = isCustom ? itemObj.item.calories : itemObj.item.calories
                    const prot = isCustom ? itemObj.item.proteinGrams : itemObj.item.protein

                    return (
                      <div key={index} className="bg-primary/10 border border-border/80 rounded-xl p-4 flex flex-col justify-between gap-3">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-foreground/90 line-clamp-1">{name}</h4>
                            <span className="text-[10px] text-foreground/50 block font-semibold mt-0.5">
                              {calories} cal | P: {prot}g
                            </span>
                            {isCustom && (
                              <span className="text-[9px] font-black text-accent-yellow uppercase tracking-wider block mt-1">
                                {itemObj.item.protein.split(' ')[0]} + {itemObj.item.base.split(' ')[0]}
                              </span>
                            )}
                          </div>
                          <span className="font-extrabold text-accent-yellow text-sm">₹{price * itemObj.quantity}</span>
                        </div>

                        {/* Adjust Qty */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(index, -1)}
                              className="px-2 py-1 bg-primary/20 hover:bg-primary/45 transition text-foreground"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 text-sm font-bold bg-black/20 w-8 text-center">{itemObj.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(index, 1)}
                              className="px-2 py-1 bg-primary/20 hover:bg-primary/45 transition text-foreground"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => updateQuantity(index, -itemObj.quantity)}
                            className="text-xs text-red-400 hover:text-red-300 font-bold transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Nutrition Tracker Summary & Target Tracker */}
              {order.length > 0 && !orderSuccess && (
                <div className="p-6 border-t border-border bg-primary/10">
                  <div className="mb-6 space-y-4">
                    {/* Live Macro Accumulator relative to Daily Targets */}
                    <div className="bg-black/30 rounded-xl p-4 border border-border/80">
                      <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">Order Fuel Accumulator</h4>
                      
                      {/* Calories */}
                      <div className="space-y-1 mb-2.5">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>Calories</span>
                          <span className="text-accent-yellow font-extrabold">{orderSummaryData.calories} / {dailyTargets.calories} kcal</span>
                        </div>
                        <div className="h-2 w-full bg-primary/45 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-yellow rounded-full" style={{ width: `${Math.min(100, (orderSummaryData.calories / dailyTargets.calories) * 100)}%` }}></div>
                        </div>
                      </div>

                      {/* Protein */}
                      <div className="space-y-1 mb-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-red-400">Total Protein</span>
                          <span className="text-foreground font-extrabold">{orderSummaryData.protein}g / {dailyTargets.protein}g</span>
                        </div>
                        <div className="h-2 w-full bg-primary/45 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(100, (orderSummaryData.protein / dailyTargets.protein) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-foreground/60 text-sm">
                      <span>Order Subtotal</span>
                      <span>₹{orderSummaryData.price}</span>
                    </div>
                    <div className="flex justify-between text-foreground/60 text-sm">
                      <span>GST / Service Charge</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-lg">
                      <span>Total Price</span>
                      <span className="text-accent-yellow">₹{orderSummaryData.price}</span>
                    </div>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-2.5 text-xs text-accent flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Earn <strong>{Math.floor(orderSummaryData.price / 10)} RPM Points</strong> on this order!</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    Send to Kitchen & Pay <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-center text-foreground/45 mt-3">
                    Your meal will be served hot at the Rev & Rep Cafe Lounge.
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
