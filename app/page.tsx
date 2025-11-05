import type { Metadata } from 'next'
import HomePage from './components/HomePage'
import fs from 'fs'
import path from 'path'

// Interface for image mapping
interface ImageMapping {
  metadata: {
    totalJsons: number;
    totalImages: number;
    mappedCount: number;
  };
  mappings: {
    [slug: string]: {
      image: string;
      similarity: number;
      matchType: string;
    };
  };
}

// Function to load image mappings
function getImageMappings(): ImageMapping | null {
  try {
    const mappingPath = path.join(process.cwd(), 'public', 'data', 'image-mapping.json');
    const mappingContents = fs.readFileSync(mappingPath, 'utf8');
    return JSON.parse(mappingContents);
  } catch (error) {
    console.error('Error reading image mappings:', error);
    return null;
  }
}

// Function to get all nutrition pages with image mapping
function getAllNutritionPages() {
  try {
    const nutritionDir = path.join(process.cwd(), 'public', 'data', 'nutrition-grok4');
    const imageMappings = getImageMappings();
    
    if (!fs.existsSync(nutritionDir)) {
      return [];
    }
    
    const files = fs.readdirSync(nutritionDir)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const slug = file.replace('.json', '');
          const filePath = path.join(nutritionDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          
          // Get image from mapping
          const imageInfo = imageMappings?.mappings[slug];
          
          return {
            slug,
            title: data.title || slug,
            quickAnswer: data.quick_answer?.text || '',
            totalKcal: data.quick_answer?.total_kcal || 0,
            imageName: imageInfo?.image || null,
            hasImage: !!imageInfo
          };
        } catch (parseError) {
          console.error(`Error parsing JSON file: ${file}`, parseError);
          return null; // Return null for invalid files
        }
      })
      .filter(page => page !== null) // Filter out invalid files
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

export default function Page() {
  const nutritionPages = getAllNutritionPages();
  
  return <HomePage pages={nutritionPages} />;
}