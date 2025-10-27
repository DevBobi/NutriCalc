import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

// Function to get all nutrition pages
function getAllNutritionPages() {
  try {
    const nutritionDir = path.join(process.cwd(), 'public', 'data', 'nutrition-grok4');
    if (!fs.existsSync(nutritionDir)) {
      return [];
    }
    
    const files = fs.readdirSync(nutritionDir)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const slug = file.replace('.json', '');
        const filePath = path.join(nutritionDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        return {
          slug,
          title: data.title,
          quickAnswer: data.quick_answer?.text || '',
          totalKcal: data.quick_answer?.total_kcal || 0
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
    
    return files;
  } catch (error) {
    console.error('Error reading nutrition pages:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'NutriCalc - Nutrition Data & Calorie Calculator',
  description: 'Comprehensive nutrition data for thousands of foods. Get accurate calorie counts, macros, and detailed nutrition breakdowns for any food item.',
  keywords: ['nutrition data', 'calorie calculator', 'food nutrition', 'macros', 'diet tracking'],
  openGraph: {
    title: 'NutriCalc - Nutrition Data & Calorie Calculator',
    description: 'Comprehensive nutrition data for thousands of foods. Get accurate calorie counts, macros, and detailed nutrition breakdowns.',
  },
}

export default function HomePage() {
  const nutritionPages = getAllNutritionPages();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            NutriCalc
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive nutrition data for thousands of foods. Get accurate calorie counts, macros, and detailed nutrition breakdowns for any food item.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/calculator" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Calorie Calculator
            </Link>
            <Link 
              href="/foods" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Foods
            </Link>
          </div>
        </div>

        {/* Featured Nutrition Pages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Nutrition Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutritionPages.slice(0, 6).map((page) => (
              <Link 
                key={page.slug}
                href={`/calories-in/${page.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
              >
                {/* Food Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={`/images/nutrition/${page.slug}.png`}
                    alt={page.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-blue-600">
                      {page.totalKcal} kcal
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {page.quickAnswer}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                      View Details
                    </span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Nutrition Pages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            All Nutrition Pages ({nutritionPages.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nutritionPages.map((page) => (
              <Link 
                key={page.slug}
                href={`/calories-in/${page.slug}`}
                className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {page.totalKcal} kcal
                  </span>
                  <span className="text-xs text-gray-500">→</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {page.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Explore More Nutrition Data?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our comprehensive collection of nutrition pages with detailed calorie counts, macros, and preparation variations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/calories-in" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Nutrition Pages
            </Link>
            <Link 
              href="/calculator" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Use Calorie Calculator
            </Link>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}