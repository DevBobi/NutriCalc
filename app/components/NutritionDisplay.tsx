'use client'

import { motion } from 'framer-motion'
import { Badge } from './DesignSystem'

interface NutritionData {
  calories_kcal: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g: number
  sugars_g: number
  sat_fat_g: number
  trans_fat_g: number
  cholesterol_mg: number
  sodium_mg: number
}

interface NutritionDisplayProps {
  nutrition: NutritionData
  labelNote?: string
  showDailyValues?: boolean
}

// Comprehensive nutrition field configuration
const NUTRITION_FIELDS = [
  {
    key: 'calories_kcal' as keyof NutritionData,
    label: 'Calories',
    unit: 'kcal',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    dailyValue: 2000,
    important: true
  },
  {
    key: 'protein_g' as keyof NutritionData,
    label: 'Protein',
    unit: 'g',
    color: 'text-nutrient-protein',
    bgColor: 'bg-nutrient-protein/10',
    dailyValue: 50,
    important: true
  },
  {
    key: 'carbs_g' as keyof NutritionData,
    label: 'Carbs',
    unit: 'g',
    color: 'text-nutrient-carbs',
    bgColor: 'bg-nutrient-carbs/10',
    dailyValue: 275,
    important: true
  },
  {
    key: 'fiber_g' as keyof NutritionData,
    label: 'Fiber',
    unit: 'g',
    color: 'text-nutrient-fiber',
    bgColor: 'bg-nutrient-fiber/10',
    dailyValue: 28,
    important: true
  },
  {
    key: 'sugars_g' as keyof NutritionData,
    label: 'Sugars',
    unit: 'g',
    color: 'text-nutrient-sugar',
    bgColor: 'bg-nutrient-sugar/10',
    dailyValue: 50,
    important: true
  },
  {
    key: 'fat_g' as keyof NutritionData,
    label: 'Fat',
    unit: 'g',
    color: 'text-nutrient-fat',
    bgColor: 'bg-nutrient-fat/10',
    dailyValue: 78,
    important: true
  },
  {
    key: 'sat_fat_g' as keyof NutritionData,
    label: 'Saturated Fat',
    unit: 'g',
    color: 'text-error',
    bgColor: 'bg-error/10',
    dailyValue: 20,
    important: false
  },
  {
    key: 'trans_fat_g' as keyof NutritionData,
    label: 'Trans Fat',
    unit: 'g',
    color: 'text-error',
    bgColor: 'bg-error/10',
    dailyValue: null, // No established daily value
    important: false
  },
  {
    key: 'cholesterol_mg' as keyof NutritionData,
    label: 'Cholesterol',
    unit: 'mg',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    dailyValue: 300,
    important: false
  },
  {
    key: 'sodium_mg' as keyof NutritionData,
    label: 'Sodium',
    unit: 'mg',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    dailyValue: 2300,
    important: false
  }
] as const

export default function NutritionDisplay({ 
  nutrition, 
  labelNote,
  showDailyValues = true 
}: NutritionDisplayProps) {
  const calculateDailyValue = (value: number, dailyValue: number | null) => {
    if (!dailyValue) return null
    return ((value / dailyValue) * 100).toFixed(1)
  }

  const importantFields = NUTRITION_FIELDS.filter(f => f.important)
  const otherFields = NUTRITION_FIELDS.filter(f => !f.important)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Nutrition Facts */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card"
      >
        <div className="bg-gradient-primary text-white p-4 -m-6 mb-6 rounded-t-2xl">
          <h2 className="text-2xl font-display font-bold">Nutrition Facts</h2>
          <p className="text-white/90 text-sm">Complete nutritional breakdown</p>
        </div>

        <div className="space-y-3">
          {NUTRITION_FIELDS.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex justify-between items-center p-3 rounded-lg ${field.bgColor} border border-transparent hover:border-current transition-smooth`}
            >
              <span className="font-medium text-text-primary">{field.label}</span>
              <span className={`font-bold ${field.color}`}>
                {nutrition[field.key]} {field.unit}
              </span>
            </motion.div>
          ))}
        </div>

        {labelNote && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <p className="text-sm text-primary-700 italic">
              {labelNote}
            </p>
          </div>
        )}
      </motion.div>

      {/* Right Panel: Daily Value Context */}
      {showDailyValues && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="bg-gradient-accent text-white p-4 -m-6 mb-6 rounded-t-2xl">
            <h2 className="text-2xl font-display font-bold">Daily Value Context</h2>
            <p className="text-white/90 text-sm">How this fits into daily nutrition</p>
          </div>

          <div className="space-y-4">
            {/* Important Nutrients with Daily Values */}
            {importantFields.map((field, index) => {
              const dailyPercent = calculateDailyValue(nutrition[field.key], field.dailyValue)
              
              return (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl ${field.bgColor} border border-transparent hover:border-current transition-smooth`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-text-primary">{field.label}</span>
                    <span className={`text-2xl font-bold ${field.color}`}>
                      {nutrition[field.key]} {field.unit}
                    </span>
                  </div>
                  {dailyPercent !== null && (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(parseFloat(dailyPercent), 100)}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                          className={`h-full ${field.color.replace('text-', 'bg-')}`}
                        />
                      </div>
                      <span className="text-sm font-medium text-text-secondary ml-3">
                        {dailyPercent}%
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-text-secondary mt-1">
                    of daily {field.label.toLowerCase()} {field.dailyValue && `(${field.dailyValue}${field.unit})`}
                  </p>
                </motion.div>
              )
            })}

            {/* Other Nutrients */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold text-text-primary mb-3">Additional Nutrients</h3>
              <div className="space-y-2">
                {otherFields.map((field, index) => {
                  const dailyPercent = calculateDailyValue(nutrition[field.key], field.dailyValue)
                  
                  return (
                    <div
                      key={field.key}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-surface-50 transition-smooth"
                    >
                      <span className="text-sm text-text-secondary">{field.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${field.color}`}>
                          {nutrition[field.key]} {field.unit}
                        </span>
                        {dailyPercent !== null && (
                          <span className="text-xs text-text-secondary">
                            ({dailyPercent}%)
                          </span>
                        )}
                        {field.key === 'trans_fat_g' && (
                          <Badge variant="sugar" className="text-xs">
                            Avoid
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-xl">
            <p className="text-sm text-accent-700">
              <strong>Daily Values:</strong> Based on a 2000-calorie diet for general nutrition advice.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Compact version for smaller displays
export function NutritionDisplayCompact({ nutrition, labelNote }: Omit<NutritionDisplayProps, 'showDailyValues'>) {
  return (
    <div className="card">
      <h3 className="text-xl font-display font-semibold text-text-primary mb-4">
        Nutrition Facts
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {NUTRITION_FIELDS.map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className={`p-3 rounded-lg ${field.bgColor} text-center`}
          >
            <p className="text-xs text-text-secondary mb-1">{field.label}</p>
            <p className={`text-lg font-bold ${field.color}`}>
              {nutrition[field.key]}
              <span className="text-xs ml-1">{field.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {labelNote && (
        <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-xs text-primary-700 italic">{labelNote}</p>
        </div>
      )}
    </div>
  )
}


