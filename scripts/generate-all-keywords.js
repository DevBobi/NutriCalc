#!/usr/bin/env node

/**
 * 🧠 NutriCalc - Grok-4 Nutrition JSON Generator
 * 
 * This script reads keywords from an Excel file and generates:
 * Comprehensive nutrition JSON data using Grok-4-fast-reasoning model
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
require('dotenv').config();
const OpenAI = require('openai');

// Initialize Azure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/grok-4-fast-reasoning`,
  defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: {
    'api-key': process.env.AZURE_OPENAI_API_KEY,
  },
});

// Configuration
const CONFIG = {
  model: 'grok-4-fast-reasoning',
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
  inputFile: 'calories-in_broad-match_us_2025-10-03.xlsx',
  inputPath: './input/',
  outputPath: './public/data/nutrition-grok4/',
  maxRetries: 3,
  delayBetweenRequests: 2000, // 2 seconds delay to respect rate limits
};

// Comprehensive system message for Grok-4
const SYSTEM_MESSAGE = `Role: Nutrition data content generator with expertise in SEO and structured JSON formatting.

Instructions:  
- Take the provided keyword {keyword} as the input.  
- Understand the keyword to extract:  
  - The **amount** (number, weight, or volume).  
  - The **unit** (e.g., g, ml, slice, burger, egg).  
  - The **food item** (e.g., "chicken breast", "boiled egg", "Cheetos").  
- Use the given **JSON template** as the exact structure for your output.  
- Populate every field in the JSON with:  
  - Concise, SEO-optimized text for \`title\`, \`meta_description\`, \`slug\`, \`h1\`.  
  - Date in \`updated\` field as today's date in \`YYYY-MM-DD\`.  
  - Realistic nutrition data per unit or per 100 g (basis) and scale to totals.  
  - A short, plain-language \`quick_answer\`.  
  - At least 2–3 reasonable \`tweaks\` (variations in preparation or ingredients).  
  - Exactly the number of FAQs specified in \`faqs_required_count\`.  
- Ensure the **JSON is always valid, properly closed, and strictly follows the schema**.  
- Do not add explanations outside the JSON. Output **only the JSON**.  

JSON Template:
{
  "keyword": "Primary target phrase for SEO (e.g., 'how many calories in 2 burgers' or 'calories in 200 g chicken breast')",
  "title": "Exact question or close match to the keyword; keep natural and concise (aim ≤ 60 chars).",
  "meta_description": "1–2 sentences (≤ 160 chars) that INCLUDE the keyword verbatim once and promise the quick answer/what's inside.",
  "slug": "Lowercase, hyphenated URL path based on the keyword (e.g., '/calories-in/2-burgers').",
  "h1": "Usually the same as title for consistency.",
  "updated": "Last updated date in YYYY-MM-DD.",
  "query": {
    "amount": "Number the user asked about (e.g., 2, 200).",
    "unit": "Unit for the amount (e.g., 'burger', 'g', 'ml').",
    "item": "Food name in plain text (e.g., 'hamburger', 'chicken breast')."
  },
  "assumptions": "Short data assumptions so values are interpretable (e.g., 'skinless, boneless, cooked; bun included; standard condiments').",
  "disclaimer": "Brief variability note (e.g., 'Nutrition varies by brand, recipe, size, and cooking method. Check labels when available.').",
  "quick_answer": {
    "total_kcal": "Total calories for the query amount (integer).",
    "text": "One-sentence helpful answer; use only relevant parts of the query if useful—no need to repeat the full keyword."
  },
  "basis": {
    "label": "Human-readable basis label (e.g., 'per 1 burger', 'per 100 g').",
    "amount": "Numeric basis amount (1 or 100).",
    "unit": "Basis unit ('burger', 'g', 'ml', etc.).",
    "nutrition": {
      "calories_kcal": "Calories per basis.",
      "carbs_g": "Carbohydrates in grams per basis.",
      "fiber_g": "Dietary fiber in grams per basis.",
      "sugars_g": "Total sugars in grams per basis.",
      "protein_g": "Protein in grams per basis.",
      "fat_g": "Total fat in grams per basis.",
      "sat_fat_g": "Saturated fat in grams per basis.",
      "trans_fat_g": "Trans fat in grams per basis.",
      "cholesterol_mg": "Cholesterol in milligrams per basis.",
      "sodium_mg": "Sodium in milligrams per basis."
    }
  },
  "nutrition_total": {
    "calories_kcal": "Total calories for the query (scaled from basis).",
    "carbs_g": "Total carbs (g) for the query.",
    "fiber_g": "Total dietary fiber (g) for the query.",
    "sugars_g": "Total sugars (g) for the query.",
    "protein_g": "Total protein (g) for the query.",
    "fat_g": "Total fat (g) for the query.",
    "sat_fat_g": "Total saturated fat (g) for the query.",
    "trans_fat_g": "Total trans fat (g) for the query.",
    "cholesterol_mg": "Total cholesterol (mg) for the query.",
    "sodium_mg": "Total sodium (mg) for the query."
  },
  "label_note": "Optional 1–2 lines explaining these fields mirror Nutrition Facts labels for easy comparison.",
  "equivalents": {
    "megajoules": "Energy conversion of total_kcal to MJ (total_kcal × 0.004184, rounded)."
  },
  "tweaks": [
    {
      "label": "Short description of a common variation (e.g., 'add one slice of cheese per burger').",
      "delta_kcal_per_unit": "Calories added/removed per unit versus basis (positive or negative).",
      "new_total_kcal": "Recomputed total calories for the query after this tweak."
    }
  ],
  "faqs_required_count": 5,
  "faqs": [
    { "q": "Natural-language question users ask (include keyword variants when it fits).", "a": "Short, direct answer." }
  ]
}

Examples:

Example 1:
{
  "keyword": "how many calories in two boiled eggs",
  "title": "How Many Calories Are in Two Boiled Eggs?",
  "meta_description": "Find out how many calories in two boiled eggs, plus protein, carbs, fat, label-style nutrients, and quick equivalents.",
  "slug": "/calories-in/2-boiled-eggs",
  "h1": "How Many Calories Are in Two Boiled Eggs?",
  "updated": "2025-10-02",
  "query": { "amount": 2, "unit": "egg", "item": "boiled egg" },
  "assumptions": "Large eggs (~50 g each), hard-boiled, no added salt/oil.",
  "disclaimer": "Nutrition varies by egg size, brand, and preparation; toppings or seasonings change values. Check packaging when available.",
  "quick_answer": {
    "total_kcal": 156,
    "text": "Two large boiled eggs provide ~156 kcal and ~13 g protein."
  },
  "basis": {
    "label": "per 1 large boiled egg",
    "amount": 1,
    "unit": "egg",
    "nutrition": {
      "calories_kcal": 78,
      "carbs_g": 0.6,
      "fiber_g": 0,
      "sugars_g": 0.6,
      "protein_g": 6.3,
      "fat_g": 5.3,
      "sat_fat_g": 1.6,
      "trans_fat_g": 0,
      "cholesterol_mg": 186,
      "sodium_mg": 62
    }
  },
  "nutrition_total": {
    "calories_kcal": 156,
    "carbs_g": 1.2,
    "fiber_g": 0,
    "sugars_g": 1.2,
    "protein_g": 12.6,
    "fat_g": 10.6,
    "sat_fat_g": 3.2,
    "trans_fat_g": 0,
    "cholesterol_mg": 372,
    "sodium_mg": 124
  },
  "label_note": "Totals mirror Nutrition Facts fields for easy comparison.",
  "equivalents": { "megajoules": 0.65 },
  "tweaks": [
    { "label": "Add 1 tsp mayonnaise per egg", "delta_kcal_per_unit": 31, "new_total_kcal": 218 },
    { "label": "Egg whites only (remove yolks)", "delta_kcal_per_unit": -55, "new_total_kcal": 46 }
  ],
  "faqs_required_count": 5,
  "faqs": [
    { "q": "How many calories per boiled egg?", "a": "About 78 kcal for one large boiled egg." },
    { "q": "What are the macros for two boiled eggs?", "a": "≈13 g protein, 10.6 g fat, 1.2 g carbs." },
    { "q": "Do boiled eggs have carbs or fiber?", "a": "Very little carbs (~0.6 g per egg) and 0 g fiber." },
    { "q": "Why is cholesterol high in eggs?", "a": "Most cholesterol is in the yolk; two large eggs ≈372 mg." },
    { "q": "Does egg size change calories?", "a": "Yes—medium eggs are lower, extra-large higher. Adjust totals by egg size." }
  ]
}

Example 2:
{
  "keyword": "calories in 200 grams chicken breast",
  "title": "Calories in 200 Grams Chicken Breast",
  "meta_description": "See calories in 200 grams chicken breast, plus protein, fat, carbs, per-100 g basis, and quick tweaks.",
  "slug": "/calories-in/200-grams-chicken-breast",
  "h1": "Calories in 200 Grams Chicken Breast",
  "updated": "2025-10-02",
  "query": { "amount": 200, "unit": "g", "item": "chicken breast" },
  "assumptions": "Skinless, boneless chicken breast, cooked (roasted or grilled), no sauce/oil added.",
  "disclaimer": "Nutrition varies by brand, cut, cooking method, seasoning, water content, and measurement; check labels when available.",
  "quick_answer": {
    "total_kcal": 330,
    "text": "200 g cooked, skinless chicken breast has ~330 kcal and ~62 g protein."
  },
  "basis": {
    "label": "per 100 g",
    "amount": 100,
    "unit": "g",
    "nutrition": {
      "calories_kcal": 165,
      "carbs_g": 0,
      "fiber_g": 0,
      "sugars_g": 0,
      "protein_g": 31,
      "fat_g": 3.6,
      "sat_fat_g": 1.0,
      "trans_fat_g": 0,
      "cholesterol_mg": 85,
      "sodium_mg": 74
    }
  },
  "nutrition_total": {
    "calories_kcal": 330,
    "carbs_g": 0,
    "fiber_g": 0,
    "sugars_g": 0,
    "protein_g": 62,
    "fat_g": 7.2,
    "sat_fat_g": 2.0,
    "trans_fat_g": 0,
    "cholesterol_mg": 170,
    "sodium_mg": 148
  },
  "label_note": "Totals are scaled from the per-100 g basis and mirror Nutrition Facts fields.",
  "equivalents": { "megajoules": 1.38 },
  "tweaks": [
    { "label": "Add 1 tsp olive oil per 100 g", "delta_kcal_per_unit": 40, "new_total_kcal": 410 },
    { "label": "Skin-on, roasted (vs. skinless) per 100 g", "delta_kcal_per_unit": 30, "new_total_kcal": 390 }
  ],
  "faqs_required_count": 5,
  "faqs": [
    { "q": "How many calories are in 200 g of cooked chicken breast?", "a": "About 330 kcal under the assumptions listed." },
    { "q": "How much protein is in 200 g chicken breast?", "a": "Roughly 62 g protein." },
    { "q": "Are these values for cooked or raw weight?", "a": "Cooked. Cooked weight is typically ~25% less than raw." },
    { "q": "What changes calories the most?", "a": "Added oil, skin-on preparation, breading, and sauces raise calories." },
    { "q": "What are the per 100 g values?", "a": "≈165 kcal, 31 g protein, 3.6 g fat, 0 g carbs per 100 g cooked chicken breast." }
  ]
}

Constraints:  
- Follow the JSON schema exactly — do not add, remove, or rename fields.  
- Keep \`title\` ≤ 60 characters and \`meta_description\` ≤ 160 characters.  
- Use metric units where relevant.  
- All numbers should be realistic and consistent (no placeholders).  
- Do not include text outside of the JSON.`;

/**
 * Utility function to create a URL-friendly slug
 */
function createSlug(keyword) {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Utility function to clean and normalize keywords
 */
function cleanKeyword(keyword) {
  if (!keyword || typeof keyword !== 'string') return '';
  
  return keyword
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .trim();
}

/**
 * Read keywords from Excel file
 */
function readKeywordsFromExcel() {
  const filePath = path.join(CONFIG.inputPath, CONFIG.inputFile);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file not found: ${filePath}`);
  }

  console.log(`📖 Reading keywords from: ${CONFIG.inputFile}`);
  
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Extract keywords from the first column (assuming keywords are in column A)
  const keywords = data
    .map(row => row[0])
    .filter(keyword => keyword && typeof keyword === 'string')
    .map(cleanKeyword)
    .filter(keyword => keyword.length > 0);
  
  console.log(`📊 Found ${keywords.length} keywords to process`);
  return keywords;
}

/**
 * Generate content using Grok-4 API
 */
async function generateContent(keyword, retryCount = 0) {
  try {
    console.log(`🤖 Using model: ${CONFIG.model}`);
    
    const response = await openai.chat.completions.create({
      model: CONFIG.model,
      temperature: CONFIG.temperature,
      messages: [
        { role: 'system', content: SYSTEM_MESSAGE },
        { role: 'user', content: `Generate nutrition JSON for keyword: "${keyword}"` }
      ],
    });

    const content = response.choices[0].message.content;
    
    // Parse and validate JSON
    const jsonData = JSON.parse(content);
    
    return jsonData;
    
  } catch (error) {
    if (retryCount < CONFIG.maxRetries) {
      console.log(`⚠️  Retry ${retryCount + 1}/${CONFIG.maxRetries} for: ${keyword}`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests * (retryCount + 1)));
      return generateContent(keyword, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Save JSON content to file
 */
function saveJsonContent(slug, jsonData) {
  const filePath = path.join(CONFIG.outputPath, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
}

/**
 * Process a single keyword
 */
async function processKeyword(keyword, index, total) {
  try {
    const slug = createSlug(keyword);
    console.log(`🔄 Processing ${index + 1}/${total}: ${keyword}`);
    
    // Generate content
    const jsonData = await generateContent(keyword);
    
    // Update the keyword in the JSON to match the input
    jsonData.keyword = keyword;
    jsonData.slug = slug;
    
    // Save file
    saveJsonContent(slug, jsonData);
    
    console.log(`✅ Processed: ${keyword}`);
    
    // Add delay to respect rate limits
    if (index < total - 1) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
    }
    
  } catch (error) {
    console.log(`⚠️  Skipped: ${keyword} (${error.message})`);
    return false;
  }
  
  return true;
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🧠 NutriCalc - Grok-4 Nutrition JSON Generator\n');
    console.log(`🤖 Using model: ${CONFIG.model}`);
    console.log(`📁 Output directory: ${CONFIG.outputPath}\n`);
    
    // Validate Azure OpenAI configuration
    if (!process.env.AZURE_OPENAI_API_KEY) {
      throw new Error('AZURE_OPENAI_API_KEY not found in environment variables. Please check your .env file.');
    }
    if (!process.env.AZURE_OPENAI_ENDPOINT) {
      throw new Error('AZURE_OPENAI_ENDPOINT not found in environment variables. Please check your .env file.');
    }
    
    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.outputPath)) {
      fs.mkdirSync(CONFIG.outputPath, { recursive: true });
    }
    
    // Read keywords from Excel
    const keywords = readKeywordsFromExcel();
    
    if (keywords.length === 0) {
      throw new Error('No valid keywords found in the Excel file');
    }
    
    // Check for limit argument
    const args = process.argv.slice(2);
    const limitFlag = args.find(arg => arg.startsWith('--limit='));
    const limit = limitFlag ? parseInt(limitFlag.split('=')[1]) : null;
    
    const keywordsToProcess = limit ? keywords.slice(0, limit) : keywords;
    
    console.log(`\n🚀 Starting processing of ${keywordsToProcess.length} keywords...\n`);
    
    // Process each keyword
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < keywordsToProcess.length; i++) {
      const success = await processKeyword(keywordsToProcess[i], i, keywordsToProcess.length);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    // Final summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Grok-4 JSON generation complete!');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully processed: ${successCount}`);
    console.log(`   ⚠️  Errors/Skipped: ${errorCount}`);
    console.log(`   📁 JSON files saved to: ${CONFIG.outputPath}`);
    console.log(`   🤖 Model used: ${CONFIG.model}`);
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = {
  createSlug,
  cleanKeyword,
  readKeywordsFromExcel,
  generateContent,
  processKeyword,
  main
};
