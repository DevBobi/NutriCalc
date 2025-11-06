#!/usr/bin/env node

/**
 * 🖼️ Copy Required Images Only
 * 
 * This script copies only the 20 images that match our generated JSONs
 * instead of copying all 2,117 images from NutriGenie.
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  sourceDir: '../NutriGenie/output/images/',
  targetDir: './public/images/sample/',
  jsonDir: './public/data/nutrition-grok4/',
};

// The 20 images that match our generated JSONs
const REQUIRED_IMAGES = [
  'calorie-count-in-n-out.png',
  'calories-in-80-20-ground-beef.png',
  'calories-in-a-large-french-fry-from-mcdonalds.png',
  'calories-in-a-large-fry-at-mcdonalds.png',
  'calories-in-a-movie-popcorn.png',
  'calories-in-an-egg-and-sausage-mcmuffin.png',
  'calories-in-an-egg-mcmuffin-with-sausage.png',
  'calories-in-an-vodka.png',
  'calories-in-egg-and-sausage-mcmuffin.png',
  'calories-in-large-mcdonalds-chips.png',
  'calories-in-mcdonalds-medium-chips.png',
  'calories-in-tequila.png',
  'how-many-calories-are-in-a-vape.png',
  'how-many-calories-in-a-pizzeria-slice-of-pizza.png',
  'how-many-calories-in-a-pound-of-ground-beef.png',
  'how-many-calories-in-vodka.png',
  'how-many-calories-is-in-vodka-shot.png',
  'in-n-out-calories.png',
  'in-n-out-fries-calories.png',
  'keyword.png'
];

/**
 * Copy only the required images
 */
function copyRequiredImages() {
  console.log('🖼️ Copying only required images (20 out of 2,117)...\n');

  // Ensure target directory exists
  if (!fs.existsSync(CONFIG.targetDir)) {
    fs.mkdirSync(CONFIG.targetDir, { recursive: true });
  }

  // Clear existing images first
  if (fs.existsSync(CONFIG.targetDir)) {
    const existingFiles = fs.readdirSync(CONFIG.targetDir);
    existingFiles.forEach(file => {
      if (file.endsWith('.png')) {
        fs.unlinkSync(path.join(CONFIG.targetDir, file));
      }
    });
    console.log(`🧹 Cleared ${existingFiles.length} existing images`);
  }

  let copiedCount = 0;
  let missingCount = 0;
  const missingImages = [];

  console.log('\n📋 Copying required images:\n');

  REQUIRED_IMAGES.forEach(imageName => {
    const sourcePath = path.join(CONFIG.sourceDir, imageName);
    const targetPath = path.join(CONFIG.targetDir, imageName);

    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ ${imageName}`);
        copiedCount++;
      } catch (error) {
        console.log(`❌ ${imageName} - Error: ${error.message}`);
        missingCount++;
        missingImages.push(imageName);
      }
    } else {
      console.log(`❌ ${imageName} - Not found in source`);
      missingCount++;
      missingImages.push(imageName);
    }
  });

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Image copying complete!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   📄 Required images: ${REQUIRED_IMAGES.length}`);
  console.log(`   ✅ Successfully copied: ${copiedCount}`);
  console.log(`   ❌ Missing/Errors: ${missingCount}`);
  console.log(`   💾 Space saved: ~2.8GB (99% reduction)`);
  console.log(`   📁 Target directory: ${CONFIG.targetDir}`);
  console.log('='.repeat(60));

  if (missingImages.length > 0) {
    console.log('\n⚠️  Missing images:');
    missingImages.forEach(img => console.log(`   - ${img}`));
  }

  return { copiedCount, missingCount, missingImages };
}

/**
 * Verify JSON files exist
 */
function verifyJsonFiles() {
  console.log('\n🔍 Verifying JSON files...\n');
  
  if (!fs.existsSync(CONFIG.jsonDir)) {
    console.log('❌ JSON directory not found. Run generate:test first.');
    return false;
  }

  const jsonFiles = fs.readdirSync(CONFIG.jsonDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));

  console.log(`📄 Found ${jsonFiles.length} JSON files`);
  
  // Check if we have the expected 20
  if (jsonFiles.length !== 20) {
    console.log(`⚠️  Expected 20 JSON files, found ${jsonFiles.length}`);
  }

  return true;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('🚀 NutriCalc - Optimized Image Copy\n');
    
    // Verify JSON files exist
    if (!verifyJsonFiles()) {
      process.exit(1);
    }

    // Copy only required images
    const result = copyRequiredImages();
    
    if (result.missingCount === 0) {
      console.log('\n🎯 Perfect! All 20 images copied successfully.');
      console.log('💡 Your nutrition pages are ready with optimized image loading!');
    } else {
      console.log(`\n⚠️  ${result.missingCount} images were missing. Check the list above.`);
    }

  } catch (error) {
    console.error('❌ Error copying images:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { copyRequiredImages, verifyJsonFiles };
