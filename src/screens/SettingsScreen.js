// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import { createSettingsScreenStyles } from '../styles/components/settingsScreenStyles';

export default function SettingsScreen() {
    const { theme, globalStyles } = useTheme();
    const styles = createSettingsScreenStyles(theme);

    return (
        <View style={[globalStyles.container]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <ThemeSelector />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.infoCard}>
                        <Text style={styles.appName}>Criminal Intent</Text>
                        <Text style={styles.appVersion}>Version 1.0.0</Text>
                        <Text style={styles.appDescription}>
                            A crime tracking application for managing and organizing criminal activity reports.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}