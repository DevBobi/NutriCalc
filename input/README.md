# Input Directory

Place your Excel file here with the exact filename: `calories-in_broad-match_us_2025-10-03.xlsx`

## Expected Excel File Format

The Excel file should have keywords in the **first column (Column A)**. The application will read all non-empty cells from this column.

### Example Structure:

| Column A (Keywords) |
|---------------------|
| calories in McDonald's large fries |
| calories in apple |
| calories in banana |
| calories in chicken breast |
| calories in rice |
| ... |

### Important Notes:

1. **Filename**: Must be exactly `calories-in_broad-match_us_2025-10-03.xlsx`
2. **Location**: Must be placed in this `/input/` directory
3. **Format**: Excel file (.xlsx format)
4. **Keywords**: Should be in Column A, one keyword per row
5. **Content**: Keywords should be food/nutrition related for best results

### Sample Keywords:

- `calories in McDonald's large fries`
- `calories in apple`
- `calories in banana`
- `calories in chicken breast`
- `calories in rice`
- `calories in avocado`
- `calories in salmon`
- `calories in broccoli`
- `calories in eggs`
- `calories in bread`

The application will automatically clean and normalize these keywords before processing.

