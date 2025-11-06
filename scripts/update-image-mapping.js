#!/usr/bin/env node

/**
 * 🖼️ NutriCalc - Image Mapping Generator
 * 
 * This script maps all JSON files to their corresponding images
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  jsonPath: './public/data/nutrition-grok4/',
  imagePath: './public/images/sample/',
  outputPath: './public/data/image-mapping.json',
};

function generateImageMapping() {
  console.log('🖼️ NutriCalc - Image Mapping Generator\n');

  // Get all JSON files
  const jsonFiles = fs.readdirSync(CONFIG.jsonPath)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));

  console.log(`📊 Found ${jsonFiles.length} JSON files`);

  // Get all image files
  const imageFiles = fs.readdirSync(CONFIG.imagePath)
    .filter(file => file.endsWith('.png'));

  console.log(`🖼️  Found ${imageFiles.length} image files\n`);

  // Create image lookup map (without extension for easy matching)
  const imageMap = new Map();
  imageFiles.forEach(img => {
    const baseName = img.replace('.png', '');
    imageMap.set(baseName, img);
  });

  // Map JSON slugs to images
  const mappings = {};
  let exactMatches = 0;
  let unmappedJsons = [];

  jsonFiles.forEach(slug => {
    if (imageMap.has(slug)) {
      mappings[slug] = {
        image: imageMap.get(slug),
        similarity: 1,
        matchType: 'exact'
      };
      exactMatches++;
    } else {
      unmappedJsons.push(slug);
    }
  });

  console.log(`✅ Exact matches: ${exactMatches}`);
  console.log(`⚠️  Unmapped JSONs: ${unmappedJsons.length}`);

  // Create output object
  const output = {
    metadata: {
      created: new Date().toISOString(),
      totalJsons: jsonFiles.length,
      totalImages: imageFiles.length,
      mappedCount: exactMatches,
      exactMatches: exactMatches,
      similarMatches: 0,
      unmappedJsons: unmappedJsons.slice(0, 50) // Only store first 50 to keep file size reasonable
    },
    mappings: mappings
  };

  // Write to file
  fs.writeFileSync(CONFIG.outputPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n📝 Image mapping saved to: ${CONFIG.outputPath}`);
  console.log(`\n${'='.repeat(50)}`);
  console.log('✅ Image mapping generation complete!');
  console.log(`${'='.repeat(50)}`);
}

// Run the script
if (require.main === module) {
  generateImageMapping();
}

module.exports = { generateImageMapping };


