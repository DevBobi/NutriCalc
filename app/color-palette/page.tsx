'use client'

import { AnimatedSection, Card } from '../components/DesignSystem'

export default function ColorPalettePage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-display-lg font-display font-bold text-primary mb-4">
            NutriCalc Color Palette
          </h1>
          <p className="text-xl text-text-secondary">
            Your custom design system colors
          </p>
        </div>

        <div className="space-y-12">
          {/* Primary Colors */}
          <AnimatedSection>
            <h2 className="text-display-md font-display text-text-primary mb-6">
              Primary Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <div className="h-32 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">#54d88c</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Primary</h3>
                    <p className="text-text-secondary text-sm mb-2">#54d88c</p>
                    <p className="text-text-secondary text-sm">
                      Main brand color, buttons, success states
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-4">
                  <div className="h-32 bg-primary-foreground rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">#242f2a</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Primary Foreground</h3>
                    <p className="text-text-secondary text-sm mb-2">#242f2a</p>
                    <p className="text-text-secondary text-sm">
                      Text on primary backgrounds, dark surfaces
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Primary Shades */}
            <div className="mt-6 grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="aspect-square bg-primary-50 rounded-lg flex items-center justify-center text-xs">50</div>
              <div className="aspect-square bg-primary-100 rounded-lg flex items-center justify-center text-xs">100</div>
              <div className="aspect-square bg-primary-200 rounded-lg flex items-center justify-center text-xs">200</div>
              <div className="aspect-square bg-primary-300 rounded-lg flex items-center justify-center text-xs">300</div>
              <div className="aspect-square bg-primary-400 rounded-lg flex items-center justify-center text-xs text-white">400</div>
              <div className="aspect-square bg-primary-500 rounded-lg flex items-center justify-center text-xs text-white">500</div>
              <div className="aspect-square bg-primary-600 rounded-lg flex items-center justify-center text-xs text-white">600</div>
              <div className="aspect-square bg-primary-700 rounded-lg flex items-center justify-center text-xs text-white">700</div>
              <div className="aspect-square bg-primary-800 rounded-lg flex items-center justify-center text-xs text-white">800</div>
              <div className="aspect-square bg-primary-900 rounded-lg flex items-center justify-center text-xs text-white">900</div>
            </div>
          </AnimatedSection>

          {/* Secondary Colors */}
          <AnimatedSection>
            <h2 className="text-display-md font-display text-text-primary mb-6">
              Secondary Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <div className="h-32 bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold text-2xl">#ffbf61</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Secondary</h3>
                    <p className="text-text-secondary text-sm mb-2">#ffbf61</p>
                    <p className="text-text-secondary text-sm">
                      Accent color, calories, energy, CTAs
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-4">
                  <div className="h-32 bg-secondary-foreground rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">#171717</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Secondary Foreground</h3>
                    <p className="text-text-secondary text-sm mb-2">#171717</p>
                    <p className="text-text-secondary text-sm">
                      Text on secondary backgrounds
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Secondary Shades */}
            <div className="mt-6 grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="aspect-square bg-secondary-50 rounded-lg flex items-center justify-center text-xs">50</div>
              <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center text-xs">100</div>
              <div className="aspect-square bg-secondary-200 rounded-lg flex items-center justify-center text-xs">200</div>
              <div className="aspect-square bg-secondary-300 rounded-lg flex items-center justify-center text-xs">300</div>
              <div className="aspect-square bg-secondary-400 rounded-lg flex items-center justify-center text-xs">400</div>
              <div className="aspect-square bg-secondary-500 rounded-lg flex items-center justify-center text-xs text-white">500</div>
              <div className="aspect-square bg-secondary-600 rounded-lg flex items-center justify-center text-xs text-white">600</div>
              <div className="aspect-square bg-secondary-700 rounded-lg flex items-center justify-center text-xs text-white">700</div>
              <div className="aspect-square bg-secondary-800 rounded-lg flex items-center justify-center text-xs text-white">800</div>
              <div className="aspect-square bg-secondary-900 rounded-lg flex items-center justify-center text-xs text-white">900</div>
            </div>
          </AnimatedSection>

          {/* Gradients */}
          <AnimatedSection>
            <h2 className="text-display-md font-display text-text-primary mb-6">
              Gradients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-0 overflow-hidden">
                <div className="h-32 bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Primary Gradient</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono text-text-secondary">
                    bg-gradient-primary
                  </p>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden">
                <div className="h-32 bg-gradient-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-xl">Secondary Gradient</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono text-text-secondary">
                    bg-gradient-secondary
                  </p>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden">
                <div className="h-32 bg-gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Hero Gradient</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono text-text-secondary">
                    bg-gradient-hero
                  </p>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden">
                <div className="h-32 bg-gradient-accent flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Accent Gradient</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono text-text-secondary">
                    bg-gradient-accent
                  </p>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Component Examples */}
          <AnimatedSection>
            <h2 className="text-display-md font-display text-text-primary mb-6">
              In Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Buttons
                </h3>
                <div className="space-y-3">
                  <button className="w-full btn btn-primary">
                    Primary Button
                  </button>
                  <button className="w-full btn btn-secondary">
                    Secondary Button
                  </button>
                  <button className="w-full btn btn-cta">
                    CTA Button
                  </button>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
                    Success
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium">
                    Warning
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium">
                    Info
                  </span>
                  <span className="px-3 py-1 bg-error/10 text-error border border-error/20 rounded-full text-sm font-medium">
                    Error
                  </span>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Color Values Reference */}
          <AnimatedSection>
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
              <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
                Color Reference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold mb-2">Primary</p>
                  <p className="font-mono text-primary">#54d88c</p>
                  <p className="font-mono text-text-secondary mt-1">rgb(84, 216, 140)</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold mb-2">Primary Foreground</p>
                  <p className="font-mono text-primary-foreground">#242f2a</p>
                  <p className="font-mono text-text-secondary mt-1">rgb(36, 47, 42)</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold mb-2">Secondary</p>
                  <p className="font-mono text-secondary">#ffbf61</p>
                  <p className="font-mono text-text-secondary mt-1">rgb(255, 191, 97)</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold mb-2">Secondary Foreground</p>
                  <p className="font-mono text-secondary-foreground">#171717</p>
                  <p className="font-mono text-text-secondary mt-1">rgb(23, 23, 23)</p>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

