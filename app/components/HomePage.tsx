'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Sparkles, TrendingUp, Shield, Zap, ChevronRight, Flame, Apple, Coffee } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import NutritionBrowser from './NutritionBrowser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NutritionPage {
  slug: string;
  title: string;
  quickAnswer: string;
  totalKcal: number;
  imageName: string | null;
  hasImage: boolean;
}

interface Props {
  pages: NutritionPage[];
}

export default function HomePage({ pages }: Props) {
  const [quickSearch, setQuickSearch] = useState('')
  const [showFullBrowser, setShowFullBrowser] = useState(false)
  const [showDropdown, setShowDropdown] = useState(true)

  // Quick search results (limit to 5)
  const quickResults = useMemo(() => {
    if (!quickSearch) {
      setShowDropdown(false)
      return []
    }
    setShowDropdown(true)
    return pages
      .filter(page => 
        page.title.toLowerCase().includes(quickSearch.toLowerCase())
      )
      .slice(0, 5)
  }, [pages, quickSearch])

  // Get popular/featured items
  const popularFoods = useMemo(() => {
    return pages
      .filter(p => p.hasImage && p.totalKcal > 0)
      .slice(0, 8)
  }, [pages])

  const handleQuickSearch = () => {
    setShowDropdown(false)
    setShowFullBrowser(true)
    setTimeout(() => {
      document.getElementById('full-browser')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleViewAll = () => {
    setShowFullBrowser(true)
    setTimeout(() => {
      document.getElementById('full-browser')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleResultClick = () => {
    setShowDropdown(false)
    setQuickSearch('')
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <Header />

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-visible bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge variant="default" className="text-sm py-2 px-4">
                <Sparkles className="w-3 h-3 mr-1" />
                {pages.length.toLocaleString()}+ Foods in Database
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            >
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Your Nutrition
              </span>
              <br />
              <span className="text-text-primary dark:text-dark-text">Simplified</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-text-secondary dark:text-text-secondary max-w-3xl mx-auto mb-12"
            >
              Discover detailed nutrition facts for thousands of foods. Track calories, macros, and make informed dietary choices.
            </motion.p>

            {/* Quick Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto relative z-50"
            >
              <div className="relative">
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-secondary" />
                    <Input
                      type="text"
                      placeholder="Search any food... (e.g., chicken, apple, burger)"
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                      className="pl-12 h-14 text-lg shadow-soft-lg border-2"
                      onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch()}
                    />
                  </div>
                  <Button
                    size="lg"
                    variant="cta"
                    className="h-14 px-8"
                    onClick={handleQuickSearch}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>

                {/* Quick Results Dropdown */}
                {showDropdown && quickSearch && quickResults.length > 0 && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowDropdown(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-surface dark:bg-dark-surface rounded-xl shadow-2xl border border-border dark:border-dark-border overflow-y-auto max-h-96 z-50"
                    >
                      {quickResults.map((result) => (
                        <Link
                          key={result.slug}
                          href={`/calories-in/${result.slug}`}
                          onClick={handleResultClick}
                          className="flex items-start justify-between px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary/20 transition-colors group border-b border-border/50 dark:border-dark-border/50 last:border-b-0"
                        >
                          <div className="flex-1 min-w-0 mr-4 text-left">
                            <p className="font-medium text-text-primary dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary text-left">
                              {result.title}
                            </p>
                            <p className="text-sm text-text-secondary dark:text-text-secondary line-clamp-1 text-left mt-1">
                              {result.quickAnswer}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 self-start mt-0.5">
                            <Badge variant="secondary" className="font-bold whitespace-nowrap">
                              {result.totalKcal} cal
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-text-secondary dark:text-text-secondary group-hover:text-primary dark:group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-text-primary dark:text-dark-text mb-4">
              Why Choose NutriCalc?
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-secondary max-w-2xl mx-auto">
              Everything you need to make informed nutrition decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Flame,
                title: 'Accurate Data',
                description: 'Comprehensive nutrition facts for thousands of foods',
                color: 'text-secondary'
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your calorie and macro intake effortlessly',
                color: 'text-primary'
              },
              {
                icon: Shield,
                title: 'Trusted Source',
                description: 'Verified nutrition information you can rely on',
                color: 'text-accent'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant search and quick access to nutrition data',
                color: 'text-warning'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover h-full text-center">
                  <CardHeader>
                    <div className={`inline-flex mx-auto p-4 rounded-2xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/20 mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Foods Section */}
      {popularFoods.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-surface to-background dark:from-dark-surface dark:to-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-4xl font-display font-bold text-text-primary dark:text-dark-text mb-2">
                  Popular Foods
                </h2>
                <p className="text-lg text-text-secondary dark:text-text-secondary">
                  Quick access to commonly searched nutrition data
                </p>
              </div>
              <Button variant="outline" onClick={handleViewAll}>
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularFoods.map((food, index) => (
                <motion.div
                  key={food.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/calories-in/${food.slug}`}>
                    <Card className="card-hover overflow-hidden group">
                      <div className="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                        {food.imageName ? (
                          <div className="relative w-full h-full">
                            <img
                              src={`/images/sample/${food.imageName}`}
                              alt={food.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <Apple className="w-16 h-16 text-primary/30" />
                        )}
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {food.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-2 w-fit">
                          {food.totalKcal} cal
                        </Badge>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: pages.length.toLocaleString(), label: 'Total Foods', icon: Coffee },
              { value: pages.filter(p => p.hasImage).length.toLocaleString(), label: 'With Images', icon: Sparkles },
              { value: '100%', label: 'Accurate', icon: Shield },
              { value: '24/7', label: 'Available', icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-4xl font-bold font-display text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Browser Section */}
      <section id="full-browser" className="py-20 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-text-primary dark:text-dark-text mb-4">
              Browse All Foods
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-secondary">
              Explore our complete nutrition database
            </p>
          </motion.div>

          <NutritionBrowser pages={pages} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Start Your Nutrition Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands who trust NutriCalc for accurate nutrition information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="secondary"
                className="shadow-soft-xl"
                onClick={handleViewAll}
              >
                Explore Foods
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                asChild
              >
                <Link href="/calculator">
                  Nutrition Calculator
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

