// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, defaultTheme } from '../styles/themes';
import { createGlobalStyles } from '../styles/globalStyles';

const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme storage key
const THEME_STORAGE_KEY = '@criminal_intent_theme';

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(defaultTheme);
    const [themeName, setThemeName] = useState('purple');
    const [isLoading, setIsLoading] = useState(true);

    // Load saved theme on app start
    useEffect(() => {
        loadSavedTheme();
    }, []);

    const loadSavedTheme = async () => {
        try {
            const savedThemeName = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedThemeName && themes[savedThemeName]) {
                setThemeName(savedThemeName);
                setCurrentTheme(themes[savedThemeName]);
            }
        } catch (error) {
            console.log('Error loading theme:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const changeTheme = async (newThemeName) => {
        try {
            if (themes[newThemeName]) {
                setThemeName(newThemeName);
                setCurrentTheme(themes[newThemeName]);
                await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeName);
            }
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    // Create global styles based on current theme
    const globalStyles = createGlobalStyles(currentTheme);

    const value = {
        theme: currentTheme,
        themeName,
        themes,
        globalStyles,
        changeTheme,
        isLoading,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};