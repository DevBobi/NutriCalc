import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'How Many Calories Are in 2 Hamburgers?',
  description: 'Quick answer and full nutrition breakdown for two hamburgers. See per-burger vs total calories, macros, and common label nutrients, plus quick equivalents and FAQs.',
  keywords: ['hamburger calories', 'burger nutrition', 'fast food calories', 'beef burger macros'],
  openGraph: {
    title: 'How Many Calories Are in 2 Hamburgers?',
    description: 'Quick answer and full nutrition breakdown for two hamburgers. See per-burger vs total calories, macros, and common label nutrients.',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Hero Section with Burger Image */}
                    <div className="text-center mb-8">
                      <div className="relative w-full max-w-4xl mx-auto mb-6">
                        <div className="aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                            alt="Delicious hamburger with fresh ingredients"
                            fill
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                            <div className="text-center text-white">
                              <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">Double Beef Burger</h1>
                              <p className="text-lg md:text-xl drop-shadow-md">Fresh ingredients, bold flavors</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Updated: August 1, 2025</p>
                    </div>

        {/* Main Headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Many Calories Are in 2 Hamburgers?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Quick answer and full nutrition breakdown for two hamburgers. See per-burger vs total calories, macros, and common label nutrients, plus quick equivalents and FAQs.
          </p>
        </div>

                            {/* Quick Answer Section */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-8 mb-8 shadow-sm">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Answer</h2>
                          <div className="text-4xl font-bold text-primary-600 mb-3">≈ 660 kcal</div>
                          <p className="text-gray-700 mb-4 text-lg">
                            for 2 hamburgers (about 330 kcal each). Actual calories vary with patty size, bun, cheese, sauces, and cooking method.
                          </p>
                          <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-orange-200">
                            <p className="text-sm text-gray-700">
                              <strong>Assumption for this page (example only):</strong> Plain bun + standard beef patty + basic condiments. Replace with your own dataset in production.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                            {/* Nutrition Tables */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Left Table */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900 text-lg">Nutrition — totals for 2 hamburgers</h3>
                          <p className="text-sm text-gray-600 mt-1">Complete breakdown for two servings</p>
                        </div>
                        <div className="p-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Calories</span>
                              <span className="font-bold text-xl text-primary-600">660 kcal</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Total Carbohydrate</span>
                              <span className="font-semibold text-lg">66g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6">
                              <span className="text-gray-600 text-sm">— Dietary Fiber</span>
                              <span className="font-semibold">12 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6 mb-2">
                              <span className="text-gray-600 text-sm">— Total Sugars</span>
                              <span className="font-semibold">12 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Protein</span>
                              <span className="font-semibold text-lg text-blue-600">34 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Total Fat</span>
                              <span className="font-semibold text-lg text-yellow-600">28 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6">
                              <span className="text-gray-600 text-sm">— Saturated Fat</span>
                              <span className="font-semibold">12 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6 mb-2">
                              <span className="text-gray-600 text-sm">— Trans Fat</span>
                              <span className="font-semibold">12 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Cholesterol</span>
                              <span className="font-semibold">110 mg</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-700 font-medium">Sodium</span>
                              <span className="font-semibold">1,040 mg</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Table */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900 text-lg">Per-burger comparison</h3>
                          <p className="text-sm text-gray-600 mt-1">Useful for portion calculations</p>
                        </div>
                        <div className="p-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Calories</span>
                              <span className="font-bold text-xl text-primary-600">330 kcal</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Total Carbohydrate</span>
                              <span className="font-semibold text-lg">33g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6">
                              <span className="text-gray-600 text-sm">— Dietary Fiber</span>
                              <span className="font-semibold">6 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6 mb-2">
                              <span className="text-gray-600 text-sm">— Total Sugars</span>
                              <span className="font-semibold">6 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Protein</span>
                              <span className="font-semibold text-lg text-blue-600">17 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Total Fat</span>
                              <span className="font-semibold text-lg text-yellow-600">14 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6">
                              <span className="text-gray-600 text-sm">— Saturated Fat</span>
                              <span className="font-semibold">6 g</span>
                            </div>
                            <div className="flex justify-between items-center py-1 pl-6 mb-2">
                              <span className="text-gray-600 text-sm">— Trans Fat</span>
                              <span className="font-semibold">6 g</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-700 font-medium">Cholesterol</span>
                              <span className="font-semibold">55 mg</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-700 font-medium">Sodium</span>
                              <span className="font-semibold">520 mg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                            {/* Equivalents & Quick Tweaks */}
                    <div className="mb-8">
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                          <h2 className="text-2xl font-bold text-gray-900">Equivalents & Quick Tweaks</h2>
                          <p className="text-sm text-gray-600 mt-1">Modify your burger to match your nutrition goals</p>
                        </div>
                        <div className="p-6">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-green-600 text-sm font-bold">+</span>
                                </div>
                                <div>
                                  <p className="text-green-800 font-medium mb-1">Add Cheese</p>
                                  <p className="text-green-700 text-sm">~80 kcal per burger</p>
                                  <p className="text-green-800 font-semibold mt-2">2 cheeseburgers ≈ 820 kcal</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-red-600 text-sm font-bold">-</span>
                                </div>
                                <div>
                                  <p className="text-red-800 font-medium mb-1">Skip the Bun</p>
                                  <p className="text-red-700 text-sm">~-120 kcal per burger</p>
                                  <p className="text-red-800 font-semibold mt-2">2 bunless patties ≈ 420 kcal</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-blue-600 text-sm font-bold">⚡</span>
                                </div>
                                <div>
                                  <p className="text-blue-800 font-medium mb-1">Energy Unit</p>
                                  <p className="text-blue-700 text-sm">Scientific conversion</p>
                                  <p className="text-blue-800 font-semibold mt-2">660 kcal ≈ ~2.8 megajoules</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                            {/* FAQs */}
                    <div className="mb-8">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="space-y-6">
                            <div className="border-b border-gray-100 pb-6 last:border-b-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                                <span className="text-primary-600 mr-2">Q:</span>
                                How many calories are in 2 hamburgers?
                              </h3>
                              <p className="text-gray-600 ml-6">
                                <span className="text-primary-600 font-medium">A:</span> About 660 kcal total under the assumptions above. Ingredients and portion sizes can change this significantly.
                              </p>
                            </div>

                            <div className="border-b border-gray-100 pb-6 last:border-b-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                                <span className="text-primary-600 mr-2">Q:</span>
                                What's the macro split for 2 hamburgers?
                              </h3>
                              <p className="text-gray-600 ml-6">
                                <span className="text-primary-600 font-medium">A:</span> ~66 g carbs, 28 g fat, 34 g protein (totals for two).
                              </p>
                            </div>

                            <div className="border-b border-gray-100 pb-6 last:border-b-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                                <span className="text-primary-600 mr-2">Q:</span>
                                Why show both per-burger and total?
                              </h3>
                              <p className="text-gray-600 ml-6">
                                <span className="text-primary-600 font-medium">A:</span> Searchers phrase and measure portions both ways; showing both makes comparison and portion math easy.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      </main>

      <Footer />
    </div>
  )
} 