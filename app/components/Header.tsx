'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="bg-surface dark:bg-dark-surface shadow-soft border-b border-border dark:border-dark-border sticky top-0 z-[100] backdrop-blur-sm bg-surface/95 dark:bg-dark-surface/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary/50"
            >
              <span className="text-white text-lg font-bold font-display">N</span>
            </motion.div>
            <span className="text-2xl font-bold font-display text-primary dark:text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              NutriCalc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/foods" 
              className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary px-4 py-2 text-sm font-medium transition-smooth rounded-lg hover:bg-primary-50 dark:hover:bg-primary/20"
            >
              Foods
            </Link>
            <Link 
              href="/calculator" 
              className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary px-4 py-2 text-sm font-medium transition-smooth rounded-lg hover:bg-primary-50 dark:hover:bg-primary/20"
            >
              Calculator
            </Link>
            <Link 
              href="/api" 
              className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary px-4 py-2 text-sm font-medium transition-smooth rounded-lg hover:bg-primary-50 dark:hover:bg-primary/20"
            >
              Nutrition API
            </Link>
            
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 transition-smooth"
              aria-label="Toggle dark mode"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                // Sun icon
                <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 transition-smooth"
              aria-label="Toggle dark mode"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border dark:border-dark-border">
              <Link 
                href="/foods" 
                className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 block px-4 py-3 rounded-lg text-base font-medium transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Foods
              </Link>
              <Link 
                href="/calculator" 
                className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 block px-4 py-3 rounded-lg text-base font-medium transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                href="/api" 
                className="text-text-secondary dark:text-dark-text hover:text-primary dark:hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/20 block px-4 py-3 rounded-lg text-base font-medium transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrition API
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
} 