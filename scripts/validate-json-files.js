#!/usr/bin/env node

/**
 * 🔍 NutriCalc - JSON File Validator
 * 
 * This script validates all JSON files and reports/fixes corrupted ones
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  jsonPath: './public/data/nutrition-grok4/',
};

function validateJsonFiles() {
  console.log('🔍 NutriCalc - JSON File Validator\n');

  const jsonFiles = fs.readdirSync(CONFIG.jsonPath)
    .filter(file => file.endsWith('.json'));

  console.log(`📊 Checking ${jsonFiles.length} JSON files...\n`);

  let validCount = 0;
  let invalidCount = 0;
  const invalidFiles = [];

  jsonFiles.forEach((file, index) => {
    try {
      const filePath = path.join(CONFIG.jsonPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      validCount++;
      
      // Progress indicator every 100 files
      if ((index + 1) % 100 === 0) {
        console.log(`✓ Checked ${index + 1}/${jsonFiles.length} files...`);
      }
    } catch (error) {
      invalidCount++;
      invalidFiles.push({
        file,
        error: error.message,
        position: error.message.match(/position (\d+)/)?.[1] || 'unknown'
      });
      console.error(`❌ Invalid JSON: ${file}`);
      console.error(`   Error: ${error.message}\n`);
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log('📊 Validation Summary:');
  console.log(`   ✅ Valid files: ${validCount}`);
  console.log(`   ❌ Invalid files: ${invalidCount}`);
  console.log('='.repeat(50));

  if (invalidFiles.length > 0) {
    console.log('\n⚠️  Invalid files detected:');
    invalidFiles.forEach(({ file, error }) => {
      console.log(`   - ${file}`);
      console.log(`     ${error}`);
    });
  }

  return { validCount, invalidCount, invalidFiles };
}

// Run the script
if (require.main === module) {
  const result = validateJsonFiles();
  process.exit(result.invalidCount > 0 ? 1 : 0);
}

module.exports = { validateJsonFiles };

