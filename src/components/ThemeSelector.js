// src/components/ThemeSelector.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { createThemeSelectorStyles } from '../styles/components/themeSelectorStyles';

export default function ThemeSelector() {
    const { theme, themes, themeName, changeTheme } = useTheme();
    const styles = createThemeSelectorStyles(theme);

    const handleThemeChange = (newThemeName) => {
        changeTheme(newThemeName);
    };

    const renderThemeOption = (themeKey, themeData) => {
        const isSelected = themeName === themeKey;

        return (
            <TouchableOpacity
                key={themeKey}
                style={[styles.themeOption, isSelected && styles.themeOptionSelected]}
                onPress={() => handleThemeChange(themeKey)}
                activeOpacity={0.7}
            >
                <View style={styles.themeInfo}>
                    <View style={styles.themeHeader}>
                        <View
                            style={[
                                styles.themeColorPreview,
                                { backgroundColor: themeData.colors.primary }
                            ]}
                        />
                        <Text style={styles.themeName}>{themeData.name}</Text>
                        <Text style={styles.themeType}>
                            {themeData.type === 'light' ? 'Light' : 'Dark'}
                        </Text>
                    </View>

                    <View style={styles.colorPalette}>
                        <View
                            style={[
                                styles.colorSwatch,
                                { backgroundColor: themeData.colors.background }
                            ]}
                        />
                        <View
                            style={[
                                styles.colorSwatch,
                                { backgroundColor: themeData.colors.card }
                            ]}
                        />
                        <View
                            style={[
                                styles.colorSwatch,
                                { backgroundColor: themeData.colors.primary }
                            ]}
                        />
                    </View>
                </View>

                {isSelected && (
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={theme.colors.primary}
                        style={styles.checkIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    // Group themes by type
    const lightThemes = Object.entries(themes).filter(([_, themeData]) => themeData.type === 'light');
    const darkThemes = Object.entries(themes).filter(([_, themeData]) => themeData.type === 'dark');

    return (
        <View style={styles.container}>
            <Text style={styles.groupTitle}>Light Themes</Text>
            {lightThemes.map(([themeKey, themeData]) => renderThemeOption(themeKey, themeData))}

            <Text style={styles.groupTitle}>Dark Themes</Text>
            {darkThemes.map(([themeKey, themeData]) => renderThemeOption(themeKey, themeData))}
        </View>
    );
}