# Changelog

## [2025-01-27 15:30]

### Modified
- **PressedKeySchema**: Added validation for key field to only allow specific characters
  - Restricted key input to: a-z, A-Z, 0-9, comma, dot, colon, question mark, and exclamation mark
  - Added regex pattern validation with descriptive error message
  - Updated test suite with comprehensive validation tests for valid and invalid characters
  - Enhanced test coverage for edge cases like empty strings and multiple characters

## [2025-01-27]

### Modified
- **README.md**: Updated project description from generic T3 Stack template to reflect the actual "Tucano Typing" platform
  - Added comprehensive feature list including typing modes, performance tracking, and analytics
  - Included project structure and database schema information
  - Updated tech stack description and getting started instructions
  - Reorganized content to better represent the typing practice application
