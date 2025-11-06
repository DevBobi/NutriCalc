import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

interface NutritionData {
  keyword: string;
  title: string;
  meta_description: string;
  slug: string;
  h1: string;
  updated: string;
  query: {
    amount: number;
    unit: string;
    item: string;
  };
  assumptions: string;
  disclaimer: string;
  quick_answer: {
    total_kcal: number;
    text: string;
  };
  basis: {
    label: string;
    amount: number;
    unit: string;
    nutrition: {
      calories_kcal: number;
      carbs_g: number;
      fiber_g: number;
      sugars_g: number;
      protein_g: number;
      fat_g: number;
      sat_fat_g: number;
      trans_fat_g: number;
      cholesterol_mg: number;
      sodium_mg: number;
    };
  };
  nutrition_total: {
    calories_kcal: number;
    carbs_g: number;
    fiber_g: number;
    sugars_g: number;
    protein_g: number;
    fat_g: number;
    sat_fat_g: number;
    trans_fat_g: number;
    cholesterol_mg: number;
    sodium_mg: number;
  };
  label_note: string;
  equivalents: {
    megajoules: number;
  };
  tweaks: Array<{
    label: string;
    delta_kcal_per_unit: number;
    new_total_kcal: number;
  }>;
  faqs_required_count: number;
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getNutritionData(slug: string): Promise<NutritionData | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'nutrition-grok4', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${slug}.json`);
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Validate essential fields
    if (!data.title || !data.quick_answer) {
      console.error(`Invalid data structure in ${slug}.json`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error reading nutrition data for ${slug}:`, error);
    return null;
  }
}

async function getImageForSlug(slug: string): Promise<string | null> {
  try {
    const mappingPath = path.join(process.cwd(), 'public', 'data', 'image-mapping.json');
    const mappingContents = fs.readFileSync(mappingPath, 'utf8');
    const mapping = JSON.parse(mappingContents);
    
    return mapping.mappings[slug]?.image || null;
  } catch (error) {
    console.error(`Error reading image mapping for ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const nutritionDir = path.join(process.cwd(), 'public', 'data', 'nutrition-grok4');
    
    if (!fs.existsSync(nutritionDir)) {
      return [];
    }
    
    // Generate params for ALL nutrition pages
    const files = fs.readdirSync(nutritionDir)
      .filter(file => file.endsWith('.json'));
    
    console.log(`📊 Generating static params for ${files.length} nutrition pages...`);
    
    return files.map(file => ({
      slug: file.replace('.json', ''),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getNutritionData(params.slug);
  
  if (!data) {
    return {
      title: 'Nutrition Data Not Found',
      description: 'The requested nutrition data could not be found.',
    };
  }

  return {
    title: data.title,
    description: data.meta_description,
    openGraph: {
      title: data.title,
      description: data.meta_description,
      type: 'article',
      publishedTime: data.updated,
    },
  };
}

export default async function NutritionPage({ params }: PageProps) {
  const data = await getNutritionData(params.slug);
  const imageName = await getImageForSlug(params.slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Data Not Found</h1>
          <p className="text-gray-600">The requested nutrition data could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Hero Section with Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Food Image Hero */}
          {imageName && (
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src={`/images/sample/${imageName}`}
                alt={data.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {data.h1}
                </h1>
                <div className="flex items-center justify-between text-white/90">
                  <span className="text-sm">Updated: {data.updated}</span>
                  <span className="text-sm">{data.query.amount} {data.query.unit} {data.query.item}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Quick Answer */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Quick Answer</h2>
                    <p className="text-gray-700">{data.quick_answer.text}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">
                    {data.quick_answer.total_kcal}
                  </div>
                  <div className="text-sm text-gray-600">calories</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Tables */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Nutrition Facts */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Nutrition Facts</h2>
              <p className="text-green-100 text-sm">Complete nutritional breakdown</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Calories</span>
                  <span className="font-bold text-lg text-gray-900">{data.nutrition_total.calories_kcal} kcal</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Protein</span>
                  <span className="font-bold text-lg text-green-600">{data.nutrition_total.protein_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Carbs</span>
                  <span className="font-bold text-lg text-orange-600">{data.nutrition_total.carbs_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Fat</span>
                  <span className="font-bold text-lg text-yellow-600">{data.nutrition_total.fat_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Fiber</span>
                  <span className="font-bold text-lg text-purple-600">{data.nutrition_total.fiber_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Sugars</span>
                  <span className="font-bold text-lg text-pink-600">{data.nutrition_total.sugars_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Saturated Fat</span>
                  <span className="font-bold text-lg text-red-600">{data.nutrition_total.sat_fat_g} g</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Cholesterol</span>
                  <span className="font-bold text-lg text-indigo-600">{data.nutrition_total.cholesterol_mg} mg</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Sodium</span>
                  <span className="font-bold text-lg text-blue-600">{data.nutrition_total.sodium_mg} mg</span>
                </div>
              </div>
              {data.label_note && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 italic">{data.label_note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Daily Value Context */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Daily Value Context</h2>
              <p className="text-blue-100 text-sm">How this fits into daily nutrition</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Calories Context */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Calories</span>
                    <span className="font-bold text-xl text-blue-600">{data.nutrition_total.calories_kcal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${Math.min((data.nutrition_total.calories_kcal / 2000) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((data.nutrition_total.calories_kcal / 2000) * 100).toFixed(1)}% of daily 2000-calorie diet
                  </p>
                </div>

                {/* Protein Context */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Protein</span>
                    <span className="font-bold text-lg text-green-600">{data.nutrition_total.protein_g} g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${Math.min((data.nutrition_total.protein_g / 50) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((data.nutrition_total.protein_g / 50) * 100).toFixed(1)}% of daily protein (50g)
                  </p>
                </div>

                {/* Sodium Context */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Sodium</span>
                    <span className="font-bold text-lg text-orange-600">{data.nutrition_total.sodium_mg} mg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{width: `${Math.min((data.nutrition_total.sodium_mg / 2300) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((data.nutrition_total.sodium_mg / 2300) * 100).toFixed(1)}% of daily sodium limit (2300mg)
                  </p>
                </div>

                {/* Fiber Context */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Fiber</span>
                    <span className="font-bold text-lg text-purple-600">{data.nutrition_total.fiber_g} g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{width: `${Math.min((data.nutrition_total.fiber_g / 25) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((data.nutrition_total.fiber_g / 25) * 100).toFixed(1)}% of daily fiber (25g)
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Daily Values:</strong> Based on a 2000-calorie diet for general nutrition advice
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Equivalents */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Energy Equivalents</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {data.equivalents.megajoules} MJ
              </div>
              <div className="text-gray-600">
                MegaJoules (metric energy unit)
              </div>
            </div>
          </div>
        </div>

        {/* Tweaks */}
        {data.tweaks && data.tweaks.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Preparation Variations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.tweaks.map((tweak, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{tweak.label}</h3>
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tweak.delta_kcal_per_unit > 0 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {tweak.delta_kcal_per_unit > 0 ? '+' : ''}{tweak.delta_kcal_per_unit} kcal
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {tweak.new_total_kcal} kcal total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assumptions & Disclaimer */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Data Assumptions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 min-w-0">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Assumptions</h3>
              </div>
              <div className="overflow-x-auto">
                <p className="text-gray-700 text-sm leading-relaxed break-words max-w-full overflow-auto hyphens-auto whitespace-pre-line">
                  {data.assumptions}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 min-w-0">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 !ml-2 !mr-2">Disclaimer</h3>
              </div>
              <div className="overflow-x-auto">
                <p className="text-gray-700 text-sm leading-relaxed break-words max-w-full overflow-auto hyphens-auto whitespace-pre-line">
                  {data.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">Q</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-green-600 font-bold text-xs">A</span>
                      </div>
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
