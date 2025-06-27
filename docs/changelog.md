# Changelog

## [2025-01-27 17:00]

### Added
- **Home Page with Authentication**: Implemented comprehensive home page with Google authentication integration
  - Added conditional UI based on user authentication status
  - Implemented Google sign-in with redirect to typing-test page
  - Added sign-out functionality for authenticated users
  - Created "Test" button for unauthenticated users that triggers sign-in with redirect
  - Added modern UI with gradient background, card layout, and responsive design
  - Integrated with NextAuth.js for seamless authentication flow
  - Added server actions for handling authentication operations

## [2025-01-27 16:45]

### Added
- **Typography Components**: Created comprehensive typography component library based on shadcn/ui
  - Added H1, H2, H3, H4 components for headings with proper styling and scroll margins
  - Added P component for paragraphs with consistent spacing
  - Added Blockquote component for quoted text with left border styling
  - Added Table components (Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption) for structured data display
  - Added List component for unordered lists with proper indentation
  - Added InlineCode component for code snippets with background styling
  - Added Lead component for introductory text with muted styling
  - Added Large component for emphasized text
  - Added Small component for fine print text
  - Added Muted component for secondary text with reduced opacity
  - All components follow consistent naming convention without "Typography" prefix
  - Components are fully typed with React.ComponentProps and support className customization

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
