#!/bin/bash
# Quick progress checker for JSON generation

echo "🔍 NutriCalc Generation Progress"
echo "================================"
echo ""

# Count files
TOTAL_FILES=$(ls -1 public/data/nutrition-grok4/*.json 2>/dev/null | wc -l)
echo "📁 JSON Files Generated: $TOTAL_FILES / 2283"

# Show percentage
PERCENT=$(awk "BEGIN {printf \"%.2f\", ($TOTAL_FILES / 2283) * 100}")
echo "📊 Progress: ${PERCENT}%"
echo "📈 Remaining: $((2283 - TOTAL_FILES)) files"

# Show recent log
echo ""
echo "📝 Recent Activity (last 10 lines):"
echo "-----------------------------------"
tail -10 generation.log 2>/dev/null || echo "No log file found"

echo ""
echo "🔄 To check again, run: bash check-progress.sh"

