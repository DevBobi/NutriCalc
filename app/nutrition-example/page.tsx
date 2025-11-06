'use client'

import NutritionDisplay, { NutritionDisplayCompact } from '../components/NutritionDisplay'
import { Hero, AnimatedSection } from '../components/DesignSystem'

// Example data from are-there-calories-in-vapes.json
const vapesNutritionData = {
  calories_kcal: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
  fiber_g: 0,
  sugars_g: 0,
  sat_fat_g: 0,
  trans_fat_g: 0,
  cholesterol_mg: 0,
  sodium_mg: 0
}

const labelNote = "Values reflect negligible nutritional impact from inhalation; mirrors zero Nutrition Facts for non-digestible vapors."

// Example with actual food data
const avocadoNutritionData = {
  calories_kcal: 234,
  protein_g: 3,
  carbs_g: 12,
  fat_g: 21,
  fiber_g: 10,
  sugars_g: 1,
  sat_fat_g: 3,
  trans_fat_g: 0,
  cholesterol_mg: 0,
  sodium_mg: 10
}

export default function NutritionExamplePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Complete Nutrition Display"
        subtitle="All 10 nutrition fields shown - nothing missing!"
      />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Vapes Example - Shows all fields even when zero */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="text-display-md font-display text-text-primary mb-2">
              Are There Calories in Vapes?
            </h2>
            <p className="text-text-secondary">
              All 10 nutrition fields displayed, including trans fat
            </p>
          </div>

          <NutritionDisplay
            nutrition={vapesNutritionData}
            labelNote={labelNote}
            showDailyValues={true}
          />
        </AnimatedSection>

        {/* Avocado Example - Shows with actual values */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="text-display-md font-display text-text-primary mb-2">
              Avocado (1 medium)
            </h2>
            <p className="text-text-secondary">
              Example with real nutrition values
            </p>
          </div>

          <NutritionDisplay
            nutrition={avocadoNutritionData}
            showDailyValues={true}
          />
        </AnimatedSection>

        {/* Compact Version Example */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="text-display-md font-display text-text-primary mb-2">
              Compact Display Version
            </h2>
            <p className="text-text-secondary">
              Grid layout for smaller spaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NutritionDisplayCompact
              nutrition={vapesNutritionData}
              labelNote={labelNote}
            />
            <NutritionDisplayCompact
              nutrition={avocadoNutritionData}
            />
          </div>
        </AnimatedSection>

        {/* Field Reference */}
        <AnimatedSection>
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-primary mb-4">
              ✅ All 10 Nutrition Fields Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">1️⃣</span>
                <span className="font-medium">Calories (kcal)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">2️⃣</span>
                <span className="font-medium">Protein (g)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">3️⃣</span>
                <span className="font-medium">Carbs (g)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">4️⃣</span>
                <span className="font-medium">Fiber (g)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">5️⃣</span>
                <span className="font-medium">Sugars (g)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">6️⃣</span>
                <span className="font-medium">Fat (g)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">7️⃣</span>
                <span className="font-medium">Saturated Fat (g)</span>
              </div>
              <div className="flex items-center gap-2 text-error">
                <span className="text-2xl">8️⃣</span>
                <span className="font-medium">Trans Fat (g) ⚠️</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">9️⃣</span>
                <span className="font-medium">Cholesterol (mg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔟</span>
                <span className="font-medium">Sodium (mg)</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-xl">
              <p className="text-success-700 font-medium">
                ✓ No nutrition information is hidden or missing
              </p>
              <p className="text-success-600 text-sm mt-1">
                All fields from your JSON data structure are displayed in the UI
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Usage Instructions */}
        <AnimatedSection>
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
              How to Use This Component
            </h3>
            
            <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-text-primary">{`import NutritionDisplay from '@/app/components/NutritionDisplay'

// Use your JSON data
const nutrition = {
  calories_kcal: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
  fiber_g: 0,
  sugars_g: 0,
  sat_fat_g: 0,
  trans_fat_g: 0,    // ← Now included!
  cholesterol_mg: 0,
  sodium_mg: 0
}

<NutritionDisplay
  nutrition={nutrition}
  labelNote={yourData.label_note}
  showDailyValues={true}
/>`}</pre>
            </div>

            <div className="mt-4 p-4 bg-accent-50 border border-accent-200 rounded-xl">
              <p className="text-accent-700 text-sm">
                <strong>Pro tip:</strong> The component automatically displays ALL 10 fields from your nutrition data, ensuring nothing is ever missing from the UI.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}


