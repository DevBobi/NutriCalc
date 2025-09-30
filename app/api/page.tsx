import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Nutrition API',
  description: 'Access our comprehensive nutrition database through our REST API. Get nutrition facts, calories, and macros for thousands of foods programmatically.',
  keywords: ['nutrition API', 'food API', 'calories API', 'macros API', 'nutrition database'],
}

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nutrition API
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive nutrition database through our REST API. Get nutrition facts, calories, and macros for thousands of foods programmatically.
          </p>
        </div>

        {/* API Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">API Overview</h2>
              <p className="text-gray-700 mb-4">
                Our Nutrition API provides programmatic access to our comprehensive food database. 
                Perfect for nutrition apps, meal planners, and health tracking applications.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded p-3">
                  <div className="font-semibold text-blue-600">1000+ Foods</div>
                  <div className="text-gray-600">Comprehensive database</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="font-semibold text-blue-600">RESTful API</div>
                  <div className="text-gray-600">Easy integration</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="font-semibold text-blue-600">JSON Response</div>
                  <div className="text-gray-600">Structured data</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Search for a food</h3>
              <code className="text-green-400">
                GET https://api.nutricalc.com/v1/foods/search?q=hamburger
              </code>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Get nutrition facts</h3>
              <code className="text-green-400">
                GET https://api.nutricalc.com/v1/foods/123/nutrition
              </code>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Calculate calories</h3>
              <code className="text-green-400">
                POST https://api.nutricalc.com/v1/calculate
              </code>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
          
          <div className="space-y-6">
            {/* Search Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                    <code className="text-gray-900">/v1/foods/search</code>
                  </div>
                  <span className="text-sm text-gray-500">Search foods</span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><code className="text-blue-600">q</code> - Search query (required)</div>
                      <div><code className="text-blue-600">limit</code> - Results limit (default: 10)</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Example Response</h4>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`{
  "foods": [
    {
      "id": "123",
      "name": "Hamburger",
      "calories": 330,
      "protein": 17,
      "carbs": 33,
      "fat": 14
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Nutrition Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                    <code className="text-gray-900">/v1/foods/{'{id}'}/nutrition</code>
                  </div>
                  <span className="text-sm text-gray-500">Get nutrition facts</span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm">
                      <div><code className="text-blue-600">id</code> - Food ID (required)</div>
                      <div><code className="text-blue-600">serving_size</code> - Serving size in grams (optional)</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Example Response</h4>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`{
  "id": "123",
  "name": "Hamburger",
  "serving_size": 100,
  "nutrition": {
    "calories": 330,
    "protein": 17,
    "total_carbs": 33,
    "dietary_fiber": 6,
    "sugars": 6,
    "total_fat": 14,
    "saturated_fat": 6,
    "trans_fat": 6,
    "cholesterol": 55,
    "sodium": 520
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Calculate Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                    <code className="text-gray-900">/v1/calculate</code>
                  </div>
                  <span className="text-sm text-gray-500">Calculate nutrition needs</span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`{
  "age": 25,
  "gender": "male",
  "weight": 70,
  "height": 175,
  "activity_level": "moderate",
  "goal": "maintain"
}`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Example Response</h4>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`{
  "bmr": 1650,
  "tdee": 2558,
  "target_calories": 2558,
  "macros": {
    "protein": 154,
    "carbs": 287,
    "fat": 71
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">API Key Required</h3>
                <p className="text-gray-700 mb-4">
                  All API requests require an API key. Include it in the Authorization header:
                </p>
                <code className="bg-white border border-yellow-200 rounded px-3 py-2 text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">1,000</div>
              <div className="text-gray-600">Requests per day</div>
              <div className="text-sm text-gray-500 mt-2">Free tier</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000</div>
              <div className="text-gray-600">Requests per day</div>
              <div className="text-sm text-gray-500 mt-2">Pro tier</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100,000</div>
              <div className="text-gray-600">Requests per day</div>
              <div className="text-sm text-gray-500 mt-2">Enterprise</div>
            </div>
          </div>
        </div>

        {/* SDKs and Libraries */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript/Node.js</h3>
              <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`npm install nutricalc-api

import { NutriCalcAPI } from 'nutricalc-api';

const api = new NutriCalcAPI('YOUR_API_KEY');
const foods = await api.searchFoods('hamburger');`}
              </pre>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
              <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`pip install nutricalc

import nutricalc

api = nutricalc.Client('YOUR_API_KEY')
foods = api.search_foods('hamburger')`}
              </pre>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-6">
            Sign up for a free API key and start integrating nutrition data into your application.
          </p>
          <div className="space-x-4">
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200">
              Get API Key
            </button>
            <button className="bg-white text-primary-500 border border-primary-500 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 