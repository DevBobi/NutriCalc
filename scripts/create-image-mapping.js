#!/usr/bin/env node

/**
 * 🖼️ Image Mapping Generator
 * 
 * This script creates a mapping between generated JSON files and available images
 * based on slug matching and similarity scoring.
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  jsonDir: './public/data/nutrition-grok4/',
  imageDir: './public/images/sample/',
  outputFile: './public/data/image-mapping.json',
};

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
function calculateSimilarity(str1, str2) {
  const matrix = [];
  const len1 = str1.length;
  const len2 = str2.length;

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  const distance = matrix[len1][len2];
  const maxLength = Math.max(len1, len2);
  return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
}

/**
 * Find the best matching image for a given JSON slug
 */
function findBestImageMatch(jsonSlug, imageFiles) {
  let bestMatch = null;
  let bestScore = 0;
  const threshold = 0.6; // Minimum similarity threshold

  for (const imageFile of imageFiles) {
    const imageSlug = imageFile.replace('.png', '');
    
    // Exact match gets priority
    if (imageSlug === jsonSlug) {
      return { image: imageFile, score: 1.0, type: 'exact' };
    }

    // Calculate similarity
    const similarity = calculateSimilarity(jsonSlug, imageSlug);
    
    if (similarity > bestScore && similarity >= threshold) {
      bestScore = similarity;
      bestMatch = imageFile;
    }
  }

  return bestMatch ? { image: bestMatch, score: bestScore, type: 'similar' } : null;
}

/**
 * Create comprehensive image mapping
 */
function createImageMapping() {
  console.log('🖼️ Creating image mapping for nutrition pages...\n');

  // Read JSON files
  if (!fs.existsSync(CONFIG.jsonDir)) {
    throw new Error(`JSON directory not found: ${CONFIG.jsonDir}`);
  }

  const jsonFiles = fs.readdirSync(CONFIG.jsonDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));

  // Read image files
  if (!fs.existsSync(CONFIG.imageDir)) {
    throw new Error(`Image directory not found: ${CONFIG.imageDir}`);
  }

  const imageFiles = fs.readdirSync(CONFIG.imageDir)
    .filter(file => file.endsWith('.png'));

  console.log(`📊 Found ${jsonFiles.length} JSON files and ${imageFiles.length} images`);

  // Create mapping
  const mapping = {
    metadata: {
      created: new Date().toISOString(),
      totalJsons: jsonFiles.length,
      totalImages: imageFiles.length,
      mappedCount: 0,
      exactMatches: 0,
      similarMatches: 0,
      unmappedJsons: []
    },
    mappings: {}
  };

  console.log('\n🔍 Matching JSONs to images...\n');

  for (const jsonSlug of jsonFiles) {
    const match = findBestImageMatch(jsonSlug, imageFiles);
    
    if (match) {
      mapping.mappings[jsonSlug] = {
        image: match.image,
        similarity: match.score,
        matchType: match.type
      };
      
      mapping.metadata.mappedCount++;
      if (match.type === 'exact') {
        mapping.metadata.exactMatches++;
        console.log(`✅ ${jsonSlug} → ${match.image} (exact match)`);
      } else {
        mapping.metadata.similarMatches++;
        console.log(`🔍 ${jsonSlug} → ${match.image} (${(match.score * 100).toFixed(1)}% similar)`);
      }
    } else {
      mapping.metadata.unmappedJsons.push(jsonSlug);
      console.log(`❌ ${jsonSlug} → No suitable image found`);
    }
  }

  // Save mapping
  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(mapping, null, 2), 'utf8');

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Image mapping complete!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   📄 Total JSONs: ${mapping.metadata.totalJsons}`);
  console.log(`   🖼️  Total Images: ${mapping.metadata.totalImages}`);
  console.log(`   ✅ Mapped: ${mapping.metadata.mappedCount}`);
  console.log(`   🎯 Exact matches: ${mapping.metadata.exactMatches}`);
  console.log(`   🔍 Similar matches: ${mapping.metadata.similarMatches}`);
  console.log(`   ❌ Unmapped: ${mapping.metadata.unmappedJsons.length}`);
  console.log(`   📁 Mapping saved to: ${CONFIG.outputFile}`);
  console.log('='.repeat(60));

  if (mapping.metadata.unmappedJsons.length > 0) {
    console.log('\n⚠️  Unmapped JSONs (consider creating images for these):');
    mapping.metadata.unmappedJsons.forEach(slug => {
      console.log(`   - ${slug}`);
    });
  }

  return mapping;
}

// Run if called directly
if (require.main === module) {
  try {
    createImageMapping();
  } catch (error) {
    console.error('❌ Error creating image mapping:', error.message);
    process.exit(1);
  }
}

module.exports = { createImageMapping, findBestImageMatch, calculateSimilarity };
