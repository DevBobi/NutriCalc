'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// ==========================================
// 🎨 NUTRICAL DESIGN SYSTEM COMPONENTS
// ==========================================

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeOut' }
}

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// ==========================================
// Button Components
// ==========================================

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  className = '',
  disabled = false 
}: ButtonProps) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    cta: 'btn-cta'
  }
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// ==========================================
// Card Components
// ==========================================

interface CardProps {
  children: ReactNode
  interactive?: boolean
  onClick?: () => void
  className?: string
}

export const Card = ({ children, interactive = false, onClick, className = '' }: CardProps) => {
  const cardClass = interactive ? 'card-interactive' : 'card'
  
  return (
    <motion.div
      {...(interactive ? scaleIn : {})}
      whileHover={interactive ? { y: -4 } : {}}
      className={`${cardClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// ==========================================
// Nutrition Card Component
// ==========================================

interface NutritionCardProps {
  title: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  image?: string
  onClick?: () => void
}

export const NutritionCard = ({ 
  title, 
  calories, 
  protein, 
  carbs, 
  fat,
  image,
  onClick 
}: NutritionCardProps) => {
  return (
    <Card interactive onClick={onClick}>
      {image && (
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
        {title}
      </h3>
      
      {calories !== undefined && (
        <div className="mb-4">
          <p className="text-3xl font-bold text-secondary">
            {calories} <span className="text-base text-text-secondary font-normal">cal</span>
          </p>
        </div>
      )}
      
      <div className="flex gap-2 flex-wrap">
        {protein !== undefined && (
          <span className="badge-protein">
            Protein: {protein}g
          </span>
        )}
        {carbs !== undefined && (
          <span className="badge-carbs">
            Carbs: {carbs}g
          </span>
        )}
        {fat !== undefined && (
          <span className="badge-fat">
            Fat: {fat}g
          </span>
        )}
      </div>
    </Card>
  )
}

// ==========================================
// Input Components
// ==========================================

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  icon?: ReactNode
}

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  icon 
}: InputProps) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${icon ? 'pl-10' : ''} ${className}`}
      />
    </div>
  )
}

// ==========================================
// Loading Spinner
// ==========================================

export const LoadingSpinner = () => {
  return (
    <motion.div
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
      className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full"
    />
  )
}

// ==========================================
// Loading Pulse (for skeleton states)
// ==========================================

export const LoadingPulse = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`loading-pulse ${className}`} />
  )
}

// ==========================================
// Success Checkmark
// ==========================================

export const SuccessCheck = () => {
  return (
    <motion.svg
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20 
      }}
      className="w-12 h-12 text-success"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  )
}

// ==========================================
// Badge Component
// ==========================================

interface BadgeProps {
  children: ReactNode
  variant?: 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar'
  className?: string
}

export const Badge = ({ children, variant = 'protein', className = '' }: BadgeProps) => {
  const variantClasses = {
    protein: 'badge-protein',
    carbs: 'badge-carbs',
    fat: 'badge-fat',
    fiber: 'bg-nutrient-fiber/10 text-nutrient-fiber border border-nutrient-fiber/20 px-3 py-1 rounded-full text-sm font-medium',
    sugar: 'bg-nutrient-sugar/10 text-nutrient-sugar border border-nutrient-sugar/20 px-3 py-1 rounded-full text-sm font-medium'
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.span>
  )
}

// ==========================================
// Section Container (with animations)
// ==========================================

interface SectionProps {
  children: ReactNode
  className?: string
}

export const AnimatedSection = ({ children, className = '' }: SectionProps) => {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ==========================================
// Grid Container (with stagger animation)
// ==========================================

interface GridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export const AnimatedGrid = ({ children, columns = 3, className = '' }: GridProps) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={`grid ${gridClasses[columns]} gap-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ==========================================
// Hero Section Component
// ==========================================

interface HeroProps {
  title: string
  subtitle?: string
  cta?: ReactNode
}

export const Hero = ({ title, subtitle, cta }: HeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-20 px-4"
    >
      <motion.h1 
        className="text-display-lg font-display font-bold text-text-primary mb-6 bg-gradient-hero bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {cta}
        </motion.div>
      )}
    </motion.div>
  )
}

// ==========================================
// Stats Display Component
// ==========================================

interface StatProps {
  label: string
  value: string | number
  unit?: string
  color?: 'primary' | 'secondary' | 'accent'
}

export const Stat = ({ label, value, unit, color = 'primary' }: StatProps) => {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-6 rounded-2xl bg-surface border border-border/50"
    >
      <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">{label}</p>
      <p className={`text-4xl font-bold ${colorClasses[color]}`}>
        {value}
        {unit && <span className="text-lg ml-1 text-text-secondary">{unit}</span>}
      </p>
    </motion.div>
  )
}

