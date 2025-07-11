// jest.setup.js - Aggressive mocking approach
import 'react-native-gesture-handler/jestSetup';

// Mock TurboModuleRegistry at the global level BEFORE anything else
global.__turboModuleProxy = jest.fn();

// Mock the TurboModuleRegistry module completely
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  get: jest.fn(),
  getEnforcing: jest.fn(() => ({})),
}));

// Mock specific native modules that cause issues
jest.mock('react-native/src/private/specs_DEPRECATED/modules/NativeDevMenu', () => ({
  getEnforcing: jest.fn(() => ({})),
}));

jest.mock('react-native/src/private/devmenu/DevMenu', () => ({}));

// Now mock react-native with a safer approach
jest.mock('react-native', () => {
  // Create a minimal mock instead of spreading the real module
  return {
    // Core components
    View: 'View',
    Text: 'Text',
    ScrollView: 'ScrollView',
    TouchableOpacity: 'TouchableOpacity',
    TextInput: 'TextInput',
    Image: 'Image',
    FlatList: 'FlatList',
    Modal: 'Modal',
    RefreshControl: 'RefreshControl',

    // Essential APIs
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios),
      Version: 14,
    },
    Alert: {
      alert: jest.fn(),
    },
    StyleSheet: {
      create: jest.fn((styles) => styles),
      flatten: jest.fn((style) => style),
    },

    // Animated with safe mocks
    Animated: {
      View: 'Animated.View',
      Text: 'Animated.Text',
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        setOffset: jest.fn(),
        flattenOffset: jest.fn(),
        extractOffset: jest.fn(),
        addListener: jest.fn(() => 'mockListenerId'),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        stopAnimation: jest.fn(),
        resetAnimation: jest.fn(),
        interpolate: jest.fn(() => 'mockInterpolation'),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      })),
    },

    // Safe native modules mock
    NativeModules: {},
    
    // Safe TurboModuleRegistry mock
    TurboModuleRegistry: {
      get: jest.fn(),
      getEnforcing: jest.fn(() => ({})),
    },

    // AppRegistry for React Native apps
    AppRegistry: {
      registerComponent: jest.fn(),
    },
  };
});

// Import testing library AFTER all mocks are set up
import '@testing-library/jest-native/extend-expect';

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
    }),
    useFocusEffect: jest.fn((effect) => effect()),
    useRoute: () => ({
      params: {},
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: true })),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

// Mock DateTimePicker
jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.forwardRef((props, ref) => <View testID="date-time-picker" {...props} />);
});

// Global test utilities
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);