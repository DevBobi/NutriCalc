# 🚀 Shadcn/UI - Quick Start Guide

## ✅ Everything is Ready!

Your NutriCalc app now has shadcn/ui integrated with a stunning new home page!

---

## 🎯 View Your New Home Page

### Start the Server:
```bash
npm run dev
```

### Visit:
```
http://localhost:5000
```

---

## 🎨 New Home Page Features

### 1. Hero Section
- ✨ Animated gradient background
- 🔍 Quick search with instant dropdown results
- 📊 Live database count badge
- 🌈 Gradient text with your colors

### 2. Why Choose NutriCalc?
- 4 feature cards with icons
- Smooth hover animations
- Color-coded highlights

### 3. Popular Foods
- 8 food cards with images
- Quick access to common searches
- Hover scale effects

### 4. Stats Display
- Total foods count
- Images count
- Accuracy badge
- Availability status

### 5. Full Browser
- Complete nutrition database
- Search and filter
- Grid/list views
- Pagination

### 6. CTA Section
- Gradient background
- Dual action buttons
- Smooth scroll-to functionality

---

## 🧩 Available Components

### Button
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Click Me</Button>
<Button variant="cta" size="lg">Get Started</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="outline">Explore</Button>
```

**Variants:** default, secondary, cta, outline, ghost, link, success, warning, error
**Sizes:** sm, default, lg, xl, icon

### Input
```tsx
import { Input } from '@/components/ui/input'

<Input placeholder="Search..." />
<Input type="email" placeholder="Email" />
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="default">Label</Badge>
<Badge variant="protein">High Protein</Badge>
<Badge variant="carbs">Complex Carbs</Badge>
<Badge variant="secondary">250 cal</Badge>
```

**Variants:** default, secondary, success, error, warning, outline, protein, carbs, fat, fiber, sugar

---

## 🎨 Your Colors

All components use your custom palette:
- **Primary:** #54d88c (Green)
- **Secondary:** #ffbf61 (Orange)
- **All shades:** 50-900 for each color

---

## 📱 Responsive

Everything works perfectly on:
- 📱 Mobile (320px+)
- 📊 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

---

## ⚡ Quick Examples

### Search Bar with Icon
```tsx
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

<div className="flex gap-2">
  <Input placeholder="Search foods..." className="flex-1" />
  <Button variant="cta">
    <Search className="w-4 h-4" />
  </Button>
</div>
```

### Food Card
```tsx
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Grilled Chicken</CardTitle>
    <Badge variant="protein">165 cal</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-text-secondary">
      High in protein, low in fat
    </p>
    <Button variant="outline" className="mt-4">
      View Details
    </Button>
  </CardContent>
</Card>
```

### Feature Highlight
```tsx
import { Flame } from 'lucide-react'

<Card className="text-center">
  <CardHeader>
    <Flame className="w-12 h-12 mx-auto text-secondary mb-4" />
    <CardTitle>Accurate Data</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription>
      Verified nutrition information you can trust
    </CardDescription>
  </CardContent>
</Card>
```

---

## 🌟 Icons

Using **lucide-react** for all icons:
```tsx
import { Search, Flame, Apple, Coffee, Sparkles, TrendingUp, Shield, Zap, ChevronRight } from 'lucide-react'

<Search className="w-5 h-5 text-primary" />
<Flame className="w-6 h-6 text-secondary" />
<Apple className="w-4 h-4" />
```

Browse all icons: https://lucide.dev

---

## 🎭 Animations

Using **Framer Motion**:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>
```

---

## 🔧 Utility Function

**CN Helper** for merging classes:
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-class",
  isActive && "active-class",
  "another-class"
)}>
  Content
</div>
```

---

## 📂 Where to Find Components

```
components/ui/
├── button.tsx      # Button component
├── input.tsx       # Input component
├── card.tsx        # Card components
└── badge.tsx       # Badge component

lib/
└── utils.ts        # CN utility

app/components/
└── HomePage.tsx    # New home page (see for examples!)
```

---

## 🎯 Common Patterns

### Hero Section
```tsx
<section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-20">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-5xl font-display font-bold mb-6">
      <span className="bg-gradient-hero bg-clip-text text-transparent">
        Your Title
      </span>
    </h1>
    <p className="text-xl text-text-secondary mb-8">
      Your subtitle
    </p>
    <Button variant="cta" size="lg">
      Get Started
    </Button>
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id} className="card-hover">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {item.content}
      </CardContent>
    </Card>
  ))}
</div>
```

---

## ✨ That's It!

You're all set! Visit **http://localhost:5000** to see your beautiful new home page.

Check `SHADCN-UI-IMPLEMENTATION.md` for complete documentation.

**Happy Coding! 🚀**

