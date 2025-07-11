# Criminal Intent App

A React Native mobile application built with Expo for tracking and managing criminal activity reports. The app provides a clean, intuitive interface for documenting crimes with support for photos, detailed descriptions, and case status tracking.

## Features

### 🔍 **Crime Management**
- Create, view, edit, and manage crime reports
- Add photos from device camera roll
- Set crime dates with intuitive date picker
- Mark crimes as solved/unsolved with visual indicators
- Detailed crime descriptions and notes

### 🎨 **Theming System**
- 6 beautiful themes (3 light, 3 dark)
- Real-time theme switching
- Persistent theme preferences
- Theme-aware UI components

### 💾 **Data Persistence**
- Local storage using AsyncStorage
- UUID-based crime identification
- Automatic data saving and retrieval
- No internet connection required

### 📱 **User Experience**
- Pull-to-refresh crime list
- Intuitive navigation with proper header buttons
- Empty state guidance for new users
- Form validation and error handling
- Smooth animations and transitions

### 🧪 **Testing**
- Comprehensive test suite with 67+ passing tests
- User flow testing with navigation simulation
- Pure logic testing for validation functions
- Form validation and error handling tests
- Edge case coverage and error scenarios

## Screenshots

*Note: Add screenshots here when available*

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router
- **Storage:** AsyncStorage
- **State Management:** React Context API
- **Image Handling:** Expo Image Picker
- **Date Picker:** React Native Community DateTimePicker
- **Testing:** Jest with React Native Testing Library

## Installation

### Prerequisites
- Node.js (16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd CriminalIntentApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device:**
   - **iOS:** Press `i` in terminal or scan QR code with Camera app
   - **Android:** Press `a` in terminal or scan QR code with Expo Go app

5. **Run tests:**
   ```bash
   npm test
   # or for watch mode
   npm run test:watch
   # or for coverage
   npm run test:coverage
   ```

## Project Structure

```
CriminalIntentApp/
├── App.js                          # Main app entry point (legacy)
├── app/                            # Expo Router app directory
│   ├── _layout.js                  # Root layout
│   ├── index.js                    # Main screen (crime list)
│   └── detail.js                   # Crime detail/edit screen
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── CrimeListItem.js       # Individual crime list item
│   │   ├── DatePickerModal.js     # Date selection modal
│   │   ├── EmptyState.js          # Empty state component
│   │   ├── ThemeSelector.js       # Theme selection component
│   │   ├── ToastNotification.js   # Toast messages
│   │   └── ConfirmationModal.js   # Confirmation dialogs
│   ├── context/
│   │   └── ThemeContext.js        # Theme management context
│   ├── screens/                   # Screen components (legacy)
│   │   ├── IndexScreen.js         # Crime list screen
│   │   ├── DetailScreen.js        # Crime detail/edit screen
│   │   └── SettingsScreen.js      # App settings screen
│   ├── storage/
│   │   └── crimeStorage.js        # Local storage utilities
│   ├── styles/                    # Styling and themes
│   │   ├── themes.js              # Theme definitions
│   │   ├── globalStyles.js        # Global style utilities
│   │   └── components/            # Component-specific styles
│   └── utils/                     # Utility functions
│       ├── crimeValidation.js     # Form validation logic
│       └── dateUtils.js           # Date formatting utilities
├── __tests__/                     # Test files
│   ├── expoRouterFlow.test.js     # User flow tests
│   └── validationUtils.test.js    # Pure logic tests
├── __mocks__/                     # Test mocks
├── assets/                        # Static assets
└── package.json
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

This app includes a comprehensive testing setup with two main types of tests:

### 🔄 **User Flow Tests** (`__tests__/expoRouterFlow.test.js`)
Tests complete user interactions and navigation:
- Navigation between screens (index → detail)
- Form interactions (filling out crime details)
- Button presses and user actions
- Screen state verification
- Empty state handling

### 🧮 **Pure Logic Tests** (`__tests__/validationUtils.test.js`)
Tests business logic without UI components:
- Form validation functions
- Data sanitization and transformation
- Error handling and edge cases
- Input validation (title length, date formats, etc.)
- User-friendly error message generation

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Clear Jest cache if needed
npx jest --clearCache
```

### Test Coverage
- **34+ passing tests** covering validation logic and user flows
- **Edge case testing** for invalid inputs and error scenarios
- **Comprehensive validation** for form fields and data integrity
- **Navigation testing** with proper pathname verification

## Usage

### Creating a Crime Report
1. Tap the **+** button in the header on the main screen
2. Fill in the crime title and details
3. Optionally add a photo from your camera roll
4. Set the date using the date picker
5. Mark as solved if applicable
6. Tap **SAVE** to store the crime report

### Managing Crimes
- **View:** Tap any crime in the list to view details
- **Edit:** Open a crime and modify any field, then save
- **Status:** Use the checkbox to mark crimes as solved
- **Photos:** Tap the camera button to add or change photos
- **Delete:** Use the delete button on existing crimes (with confirmation)

### Customizing Appearance
1. Tap the **settings cog** in any screen header
2. Choose from 6 available themes:
   - **Light Themes:** White, Purple, Blue
   - **Dark Themes:** Black, Dark Purple, Green
3. Theme changes apply immediately across the entire app

## Architecture Decisions

### State Management
- **Theme state:** Managed globally via React Context for consistency
- **Crime data:** Stored locally using AsyncStorage, passed via navigation params
- **Form state:** Local component state for optimal performance

### Navigation Pattern
- **Expo Router:** File-based routing system for clean navigation
- **UUID-based navigation:** Unique identifiers for crime details
- **Conditional header buttons:** Context-aware navigation elements
- **Proper back navigation:** Safe navigation with cleanup

### Styling Approach
- **Theme-aware styling:** Dynamic styling based on selected theme
- **Separated style files:** Maintainable component-specific styles
- **Global style utilities:** Consistent spacing, typography, and shadows
- **Component-specific factories:** Dynamic style creation based on theme

### Data Storage
- **AsyncStorage:** Persistent local storage for offline functionality
- **JSON serialization:** Complex data structures with proper error handling
- **UUID generation:** Unique crime identification without collisions
- **Validation layer:** Input sanitization and error prevention

### Testing Strategy
- **Separation of concerns:** UI tests vs logic tests
- **Comprehensive coverage:** User flows and business logic
- **Mock implementation:** Proper mocking of external dependencies
- **Real-world scenarios:** Edge cases and error conditions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. **Write tests** for new functionality
5. **Ensure all tests pass:** `npm test`
6. Test thoroughly on both iOS and Android
7. Commit your changes: `git commit -m 'Add feature'`
8. Push to the branch: `git push origin feature-name`
9. Submit a pull request

## Development Guidelines

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React Native best practices
- Use meaningful component and variable names
- Add comments for complex logic
- **Write tests** for new features and bug fixes

### Testing Requirements
- **User flow tests** for new screens or navigation changes
- **Unit tests** for new utility functions or validation logic
- **Edge case coverage** for error scenarios
- **Mock external dependencies** properly
- **Maintain test coverage** above 70%

### Quality Assurance
- Test on both iOS and Android platforms
- Verify theme switching works correctly
- Test data persistence across app restarts
- Validate form inputs and error handling
- **Ensure all tests pass** before submitting PRs

## Troubleshooting

### Common Issues

**Tests failing with "useTheme must be used within a ThemeProvider":**
```bash
# Clear Jest cache and re-run tests
npx jest --clearCache
npm test
```

**Dependency conflicts:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Metro bundler issues:**
```bash
# Reset Metro cache
npx expo start --clear
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Navigation powered by [Expo Router](https://expo.github.io/router/)
- Testing with [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- Styled with custom theme system

---

**Note:** This app demonstrates React Native development best practices including comprehensive testing, proper state management, and clean architecture patterns.