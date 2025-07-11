// src/components/CrimeListItem.js - Updated to use extracted utilities
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createCrimeItemStyles } from '../styles/components/crimeItemStyles';
import { formatDateForList, formatTimeForList } from '../utils/dateUtils';

export default function CrimeListItem({ crime, onPress }) {
    const { theme, globalStyles } = useTheme();
    const styles = createCrimeItemStyles(theme);

    return (
        <TouchableOpacity
            style={[globalStyles.listItem, styles.container]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {crime.title || 'Untitled Crime'}
                    </Text>
                    {crime.solved && (
                        <Text style={styles.solvedText}>✓ SOLVED</Text>
                    )}
                </View>

                <Text style={styles.date}>
                    {formatDateForList(crime.date)}
                </Text>

                <Text style={styles.time}>
                    {formatTimeForList(crime.date)}
                </Text>

                {crime.details && (
                    <Text style={styles.details} numberOfLines={2}>
                        {crime.details}
                    </Text>
                )}
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.arrowText}>→</Text>
            </View>
        </TouchableOpacity>
    );
}