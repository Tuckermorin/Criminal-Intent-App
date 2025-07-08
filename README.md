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

## Screenshots

*Note: Add screenshots here when available*

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** React Navigation v6
- **Storage:** AsyncStorage
- **State Management:** React Context API
- **Icons:** Expo Vector Icons
- **Image Handling:** Expo Image Picker
- **Date Picker:** React Native Community DateTimePicker

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

## Project Structure

```
CriminalIntentApp/
├── App.js                          # Main app entry point
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── CrimeListItem.js       # Individual crime list item
│   │   ├── DatePickerModal.js     # Date selection modal
│   │   ├── EmptyState.js          # Empty state component
│   │   └── ThemeSelector.js       # Theme selection component
│   ├── context/
│   │   └── ThemeContext.js        # Theme management context
│   ├── navigation/
│   │   └── AppNavigator.js        # Navigation configuration
│   ├── screens/                   # Main app screens
│   │   ├── IndexScreen.js         # Crime list screen
│   │   ├── DetailScreen.js        # Crime detail/edit screen
│   │   └── SettingsScreen.js      # App settings screen
│   ├── storage/
│   │   └── crimeStorage.js        # Local storage utilities
│   └── styles/                    # Styling and themes
│       ├── themes.js              # Theme definitions
│       ├── globalStyles.js        # Global style utilities
│       └── components/            # Component-specific styles
├── assets/                        # Static assets
└── package.json
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

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
- UUID-based navigation for crime details
- Conditional header buttons based on current screen
- Proper back navigation handling

### Styling Approach
- Theme-aware styling system
- Separated style files for maintainability
- Global style utilities for consistency
- Component-specific style factories

### Data Storage
- AsyncStorage for persistent local storage
- JSON serialization for complex data structures
- UUID generation for unique crime identification
- Error handling for storage operations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. Test thoroughly on both iOS and Android
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Development Guidelines

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React Native best practices
- Use meaningful component and variable names
- Add comments for complex logic

### Testing
- Test on both iOS and Android platforms
- Verify theme switching works correctly
- Test data persistence across app restarts
- Validate form inputs and error handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons provided by [Expo Vector Icons](https://icons.expo.fyi/)
- Navigation powered by [React Navigation](https://reactnavigation.org/)

---

**Note:** This app is designed for educational purposes and demonstration of React Native development practices.
