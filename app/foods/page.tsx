import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Food Database',
  description: 'Search our comprehensive food database for nutrition facts, calories, and macros. Find detailed nutritional information for thousands of foods.',
  keywords: ['food database', 'nutrition facts', 'calories', 'macros', 'food search'],
}

export default function FoodsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Food Database
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Search our comprehensive database for nutrition facts, calories, and macros. Find detailed nutritional information for thousands of foods.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a food (e.g., hamburger, apple, chicken breast)..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="mt-4 w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-200">
              Search Foods
            </button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Fast Food', icon: '🍔', count: '500+' },
              { name: 'Fruits', icon: '🍎', count: '200+' },
              { name: 'Vegetables', icon: '🥬', count: '300+' },
              { name: 'Proteins', icon: '🥩', count: '400+' },
              { name: 'Grains', icon: '🍞', count: '150+' },
              { name: 'Dairy', icon: '🥛', count: '100+' },
              { name: 'Snacks', icon: '🍿', count: '300+' },
              { name: 'Beverages', icon: '🥤', count: '200+' },
            ].map((category) => (
              <div key={category.name} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Hamburger', calories: '330', image: '🍔' },
              { name: 'Chicken Breast', calories: '165', image: '🍗' },
              { name: 'Apple', calories: '95', image: '🍎' },
              { name: 'Salmon', calories: '208', image: '🐟' },
              { name: 'Broccoli', calories: '55', image: '🥦' },
              { name: 'Greek Yogurt', calories: '130', image: '🥛' },
            ].map((food) => (
              <div key={food.name} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{food.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{food.name}</h3>
                    <p className="text-sm text-gray-500">{food.calories} calories per serving</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Data</h3>
              <p className="text-gray-600">Access nutrition facts for thousands of foods including calories, macros, vitamins, and minerals.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Information</h3>
              <p className="text-gray-600">All data is verified and regularly updated to ensure accuracy and reliability.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find foods quickly with our intuitive search interface and category browsing.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Portion Flexibility</h3>
              <p className="text-gray-600">View nutrition facts for different serving sizes and customize portions to your needs.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 