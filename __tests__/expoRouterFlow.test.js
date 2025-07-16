// __tests__/expoRouterFlow.test.js - User Flow Test (Part 1 Compliant)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';
import { renderRouter, screen, waitFor } from '@expo/router/testing-library';
import React from 'react';

// Import components for testing
import RootLayout from '../app/_layout';
import DetailPage from '../app/detail';
import Index from '../app/index';

// Mock expo-router navigation
const mockPush = jest.fn();
const mockBack = jest.fn();
let mockParams = {};

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => mockParams,
  useFocusEffect: (callback) => {
    const React = require('react');
    React.useEffect(callback, []);
  },
  Stack: ({ children }) => children,
}));

// Import ThemeProvider for wrapping components
import { ThemeProvider } from '../src/context/ThemeContext';

describe("Criminal Intent App User Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue();
    mockParams = {};
  });

  it("Creates a new crime", async () => {
    // Use renderRouter from expo-router/testing-library
    renderRouter(
      {
        _layout: () => React.createElement(RootLayout),
        index: () => React.createElement(Index),
        detail: () => React.createElement(DetailPage),
      },
      {
        initialUrl: "/",
      }
    );

    // Should start at index
    expect(screen).toHavePathname("/");

    // Find and press the add crime button (get first one - the header button)
    const addCrimeButtons = screen.getAllByTestId("add-crime-button");
    const addCrimeButton = addCrimeButtons[0]; // Use header button
    fireEvent.press(addCrimeButton);

    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/detail');
    
    // Simulate navigation to detail screen
    mockParams = {}; // New crime (no crimeId)
    
    // Re-render detail screen to simulate navigation
    render(
      React.createElement(ThemeProvider, {}, 
        React.createElement(DetailPage)
      )
    );

    // Verify we're on detail screen
    expect(screen).toHavePathname("/detail");

    // Find form elements using the required queries
    const titleInput = await screen.findByTestId("title-input");
    const detailsInput = await screen.findByTestId("details-input");
    const saveButton = await screen.findByTestId("save-button");

    // Fill out the form
    fireEvent.changeText(titleInput, "Test Crime");
    fireEvent.changeText(detailsInput, "This is a test crime.");
    
    // Press save button
    fireEvent.press(saveButton);

    // Verify the crime was saved
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    // Should still be on detail screen initially (as per example)
    expect(screen).toHavePathname("/detail");
  });

  it("Navigates from index to detail screen", async () => {
    // Start at index screen
    renderRouter(
      {
        _layout: () => React.createElement(RootLayout),
        index: () => React.createElement(Index),
        detail: () => React.createElement(DetailPage),
      },
      {
        initialUrl: "/",
      }
    );

    // Verify starting location
    expect(screen).toHavePathname("/");

    // Find and press add crime button (use first one - header button)
    const addCrimeButtons = screen.getAllByTestId("add-crime-button");
    const addCrimeButton = addCrimeButtons[0];
    fireEvent.press(addCrimeButton);

    // Verify navigation was called
    expect(mockPush).toHaveBeenCalledWith('/detail');
  });

  it("Shows empty state and allows navigation to detail", async () => {
    // Mock empty crimes list
    AsyncStorage.getItem.mockResolvedValue(null);
    
    renderRouter(
      {
        index: () => React.createElement(Index),
      },
      {
        initialUrl: "/",
      }
    );

    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText("No Crimes Reported")).toBeTruthy();
      expect(screen.getByText("Tap the + button to add your first crime report")).toBeTruthy();
    });

    // Should be able to navigate from empty state (use first button - header)
    const addCrimeButtons = screen.getAllByTestId("add-crime-button");
    const addCrimeButton = addCrimeButtons[0];
    fireEvent.press(addCrimeButton);
    
    expect(mockPush).toHaveBeenCalledWith('/detail');
  });

  it("Handles form validation on detail screen", async () => {
    // Start directly on detail screen
    renderRouter(
      {
        detail: () => React.createElement(DetailPage),
      },
      {
        initialUrl: "/detail",
      }
    );

    expect(screen).toHavePathname("/detail");

    // Try to save without title
    const saveButton = await screen.findByTestId("save-button");
    fireEvent.press(saveButton);

    // Should not save invalid data
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("Displays existing crime list and allows navigation", async () => {
    // Mock existing crimes
    const mockCrimes = [{
      id: 'test-crime-1',
      title: 'Test Crime',
      details: 'Test details',
      date: new Date().toISOString(),
      solved: false,
      createdAt: new Date().toISOString(),
    }];
    
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockCrimes));
    
    renderRouter(
      {
        index: () => React.createElement(Index),
      },
      {
        initialUrl: "/",
      }
    );

    // Should show crime in the list
    await waitFor(() => {
      expect(screen.getByText("Test Crime")).toBeTruthy();
    });

    // Press on crime should navigate to detail
    const crimeItem = screen.getByText("Test Crime");
    fireEvent.press(crimeItem);

    expect(mockPush).toHaveBeenCalledWith('/detail?crimeId=test-crime-1');
  });
});