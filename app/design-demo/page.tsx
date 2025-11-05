'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  NutritionCard,
  Input,
  Badge,
  Stat,
  Hero,
  AnimatedSection,
  AnimatedGrid,
  LoadingSpinner,
  LoadingPulse,
  SuccessCheck,
} from '../components/DesignSystem'

export default function DesignDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCalculate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero
        title="NutriCalc Design System"
        subtitle="A fresh, modern, and appetizing design for your nutrition journey"
        cta={
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="cta" size="lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        }
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* Color Palette Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Color Palette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="h-20 bg-gradient-primary rounded-xl mb-4"></div>
              <h3 className="font-semibold text-text-primary">Primary - Health</h3>
              <p className="text-sm text-text-secondary">#2ECC71 - Wellness & Vitality</p>
            </Card>
            <Card>
              <div className="h-20 bg-gradient-secondary rounded-xl mb-4"></div>
              <h3 className="font-semibold text-text-primary">Secondary - Energy</h3>
              <p className="text-sm text-text-secondary">#FFA726 - Appetite & Motivation</p>
            </Card>
            <Card>
              <div className="h-20 bg-gradient-accent rounded-xl mb-4"></div>
              <h3 className="font-semibold text-text-primary">Accent - Trust</h3>
              <p className="text-sm text-text-secondary">#03A9F4 - Clarity & Calm</p>
            </Card>
          </div>
        </AnimatedSection>

        {/* Buttons Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Button Styles
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="cta">CTA Button</Button>
          </div>
          <div className="flex gap-4 justify-center flex-wrap mt-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </AnimatedSection>

        {/* Search & Input Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Search Interface
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <Input
              placeholder="Search for any food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <div className="flex gap-4">
              <Input placeholder="Your weight (kg)" type="number" />
              <Input placeholder="Your height (cm)" type="number" />
            </div>
          </div>
        </AnimatedSection>

        {/* Nutrition Cards Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Nutrition Cards
          </h2>
          <AnimatedGrid columns={3}>
            <NutritionCard
              title="Avocado"
              calories={234}
              protein={3}
              carbs={12}
              fat={21}
            />
            <NutritionCard
              title="Grilled Chicken"
              calories={165}
              protein={31}
              carbs={0}
              fat={3.6}
            />
            <NutritionCard
              title="Brown Rice"
              calories={216}
              protein={5}
              carbs={45}
              fat={1.8}
            />
            <NutritionCard
              title="Greek Yogurt"
              calories={100}
              protein={17}
              carbs={6}
              fat={0.7}
            />
            <NutritionCard
              title="Salmon Fillet"
              calories={206}
              protein={22}
              carbs={0}
              fat={13}
            />
            <NutritionCard
              title="Sweet Potato"
              calories={86}
              protein={2}
              carbs={20}
              fat={0.1}
            />
          </AnimatedGrid>
        </AnimatedSection>

        {/* Stats Display Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Daily Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Stat label="Total Calories" value={1850} unit="cal" color="secondary" />
            <Stat label="Protein" value={120} unit="g" color="primary" />
            <Stat label="Carbs" value={200} unit="g" color="accent" />
            <Stat label="Fat" value={65} unit="g" color="secondary" />
          </div>
        </AnimatedSection>

        {/* Badges Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Nutrient Badges
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <Badge variant="protein">High Protein</Badge>
            <Badge variant="carbs">Complex Carbs</Badge>
            <Badge variant="fat">Healthy Fats</Badge>
            <Badge variant="fiber">High Fiber</Badge>
            <Badge variant="sugar">Low Sugar</Badge>
          </div>
        </AnimatedSection>

        {/* Interactive Demo Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Interactive Demo
          </h2>
          <Card className="max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
              Calculate Your Daily Nutrition
            </h3>
            <div className="space-y-4">
              <Input placeholder="Enter food name" />
              <Input placeholder="Serving size (grams)" type="number" />
              
              <Button 
                variant="primary" 
                className="w-full"
                onClick={handleCalculate}
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate Nutrition'}
              </Button>

              {loading && (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              )}

              {showSuccess && (
                <div className="flex flex-col items-center py-8">
                  <SuccessCheck />
                  <p className="text-success font-semibold mt-4">
                    Calculation Complete!
                  </p>
                </div>
              )}
            </div>
          </Card>
        </AnimatedSection>

        {/* Loading States Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Loading States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <h3 className="font-semibold mb-4 text-text-primary">Spinner</h3>
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold mb-4 text-text-primary">Skeleton Pulse</h3>
              <div className="space-y-3">
                <LoadingPulse className="h-8 w-3/4" />
                <LoadingPulse className="h-8 w-full" />
                <LoadingPulse className="h-8 w-5/6" />
              </div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Typography Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Typography Scale
          </h2>
          <Card className="max-w-4xl mx-auto">
            <h1 className="text-display-xl font-display font-bold text-primary mb-4">
              Display XL - Hero Headline
            </h1>
            <h2 className="text-display-lg font-display font-bold text-text-primary mb-4">
              Display LG - Page Title
            </h2>
            <h3 className="text-display-md font-display font-semibold text-text-primary mb-4">
              Display MD - Section Header
            </h3>
            <h4 className="text-display-sm font-display font-semibold text-text-primary mb-4">
              Display SM - Subsection
            </h4>
            <p className="text-base text-text-secondary mb-2">
              Body text using Inter - Regular paragraph with comfortable reading size and spacing.
            </p>
            <p className="text-sm text-text-secondary">
              Small text for captions and secondary information
            </p>
          </Card>
        </AnimatedSection>

        {/* Dark Mode Toggle Section */}
        <AnimatedSection>
          <h2 className="text-display-md font-display text-text-primary mb-8 text-center">
            Theme Toggle
          </h2>
          <div className="flex justify-center">
            <Button 
              variant="secondary"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              Toggle Dark Mode
            </Button>
          </div>
        </AnimatedSection>

      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-display font-bold text-primary mb-2">
            NutriCalc
          </h3>
          <p className="text-text-secondary">
            Made with 💚 for healthy eating and delightful UX
          </p>
        </div>
      </footer>
    </div>
  )
}

