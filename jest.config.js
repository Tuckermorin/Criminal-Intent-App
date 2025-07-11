// jest.config.js
module.exports = {
  // Use the Expo preset so native modules are mocked automatically
  preset: 'jest-expo',

  // Run your setup file (where you import native matchers and
  // wire up Expo Router’s jestSetup) before each test suite
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // What file extensions Jest will look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // How Jest finds your tests
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],

  // Your custom path alias
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Ignore these directories
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
  ],
};
