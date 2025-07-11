// jest.config.js - Fixed configuration
module.exports = {
  // Use the Expo preset so native modules are mocked automatically
  preset: 'jest-expo',

  // Run your setup file before each test suite
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // What file extensions Jest will look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // How Jest finds your tests
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],

  // Fixed: moduleNameMapper (not moduleNameMapping)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Ignore these directories
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
    '<rootDir>/dist/',
  ],

  // Test environment
  testEnvironment: 'node',

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output for better debugging
  verbose: true,
};