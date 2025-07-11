// __tests__/userFlow.test.js - Fixed import paths
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';

// Import your components - FIXED PATHS
import { ThemeProvider } from '../src/context/ThemeContext';
import DetailScreen from '../src/screens/DetailScreen';
import IndexScreen from '../src/screens/IndexScreen';

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useFocusEffect: jest.fn((effect) => effect()),
}));

// Helper to render with theme
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe("Criminal Intent App User Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock AsyncStorage responses
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === '@criminal_intent_crimes') {
        return Promise.resolve(null);
      }
      if (key === '@criminal_intent_theme') {
        return Promise.resolve('purple');
      }
      return Promise.resolve(null);
    });
    
    AsyncStorage.setItem.mockResolvedValue(undefined);
  });

  describe('IndexScreen', () => {
    it('renders IndexScreen correctly with empty state', async () => {
      renderWithTheme(<IndexScreen />);
      
      await waitFor(() => {
        expect(screen.getByText('No Crimes Reported')).toBeTruthy();
        expect(screen.getByText('Tap the + button to add your first crime report')).toBeTruthy();
      });
    });

    it('shows add crime button in empty state', async () => {
      renderWithTheme(<IndexScreen />);
      
      await waitFor(() => {
        const addButton = screen.getByText('Add Crime');
        expect(addButton).toBeTruthy();
      });
    });
  });

  describe('DetailScreen', () => {
    const mockRoute = {
      params: { crimeId: null }
    };

    it('renders DetailScreen for new crime', async () => {
      renderWithTheme(<DetailScreen route={mockRoute} />);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Enter crime title')).toBeTruthy();
        expect(screen.getByPlaceholderText('What happened?')).toBeTruthy();
        expect(screen.getByText('SAVE')).toBeTruthy();
      });
    });

    it('validates title input and shows error for empty title', async () => {
      renderWithTheme(<DetailScreen route={mockRoute} />);
      
      const saveButton = await screen.findByText('SAVE');
      fireEvent.press(saveButton);
      
      // Should show validation toast
      await waitFor(() => {
        expect(screen.getByText('Please enter a title for the crime')).toBeTruthy();
      });
    });

    it('allows filling out crime form', async () => {
      renderWithTheme(<DetailScreen route={mockRoute} />);
      
      const titleInput = await screen.findByPlaceholderText('Enter crime title');
      const detailsInput = await screen.findByPlaceholderText('What happened?');
      
      fireEvent.changeText(titleInput, 'Test Crime');
      fireEvent.changeText(detailsInput, 'This is a test crime.');
      
      expect(titleInput.props.value).toBe('Test Crime');
      expect(detailsInput.props.value).toBe('This is a test crime.');
    });

    it('toggles solved status', async () => {
      renderWithTheme(<DetailScreen route={mockRoute} />);
      
      const solvedCheckbox = await screen.findByText('Solved');
      fireEvent.press(solvedCheckbox);
      
      // Should show checkmark
      await waitFor(() => {
        expect(screen.getByText('✓')).toBeTruthy();
      });
    });

    it('saves crime with valid data', async () => {
      renderWithTheme(<DetailScreen route={mockRoute} />);
      
      const titleInput = await screen.findByPlaceholderText('Enter crime title');
      const saveButton = await screen.findByText('SAVE');
      
      fireEvent.changeText(titleInput, 'Valid Crime Title');
      fireEvent.press(saveButton);
      
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          '@criminal_intent_crimes',
          expect.stringContaining('Valid Crime Title')
        );
      });
    });
  });

  describe('Integration Tests', () => {
    it('completes full crime creation flow', async () => {
      // Start with IndexScreen
      const { rerender } = renderWithTheme(<IndexScreen />);
      
      await waitFor(() => {
        expect(screen.getByText('No Crimes Reported')).toBeTruthy();
      });
      
      // Simulate navigation to DetailScreen
      const mockRoute = { params: { crimeId: null } };
      rerender(
        <ThemeProvider>
          <DetailScreen route={mockRoute} />
        </ThemeProvider>
      );
      
      // Fill out the form
      const titleInput = await screen.findByPlaceholderText('Enter crime title');
      const detailsInput = await screen.findByPlaceholderText('What happened?');
      const saveButton = await screen.findByText('SAVE');
      
      fireEvent.changeText(titleInput, 'Integration Test Crime');
      fireEvent.changeText(detailsInput, 'This crime was created during integration testing.');
      fireEvent.press(saveButton);
      
      // Verify save was called
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          '@criminal_intent_crimes',
          expect.stringContaining('Integration Test Crime')
        );
      });
      
      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('Crime saved successfully!')).toBeTruthy();
      });
    });
  });
});