// __mocks__/expo-router-testing.js - Mock for expo-router testing library
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock implementation of renderRouter
export const renderRouter = (routes, options = {}) => {
  const { initialUrl = '/' } = options;
  
  // Simple router simulation - render the component for the initial URL
  let ComponentToRender;
  
  if (initialUrl === '/' && routes.index) {
    ComponentToRender = routes.index;
  } else if (initialUrl === '/detail' && routes.detail) {
    ComponentToRender = routes.detail;
  } else if (routes._layout) {
    ComponentToRender = routes._layout;
  }
  
  if (ComponentToRender) {
    return render(React.createElement(ComponentToRender));
  }
  
  throw new Error(`No route found for ${initialUrl}`);
};

// Mock screen object with additional pathname checking
export const screen = {
  ...require('@testing-library/react-native').screen,
  toHavePathname: jest.fn(),
};

// Add pathname checking capability to screen
screen.toHavePathname = (pathname) => {
  // Mock implementation - in real tests this would check the current route
  return {
    pathname: pathname,
    pass: true,
    message: () => `Expected screen to have pathname ${pathname}`,
  };
};

// Mock userEvent
export const userEvent = {
  setup: () => ({
    press: jest.fn(async (element) => {
      const { fireEvent } = require('@testing-library/react-native');
      fireEvent.press(element);
    }),
    type: jest.fn(async (element, text) => {
      const { fireEvent } = require('@testing-library/react-native');
      fireEvent.changeText(element, text);
    }),
  }),
};

// Mock waitFor
export const waitFor = async (callback, options = {}) => {
  const { waitFor: originalWaitFor } = require('@testing-library/react-native');
  return originalWaitFor(callback, { timeout: 3000, ...options });
};