// src/components/CrimeListItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { createCrimeItemStyles } from '../styles/components/crimeItemStyles';

export default function CrimeListItem({ crime, onPress }) {
    const { theme, globalStyles } = useTheme();
    const styles = createCrimeItemStyles(theme);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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
                        <Ionicons
                            name="hand-left"
                            size={20}
                            color={theme.colors.primary}
                            style={styles.solvedIcon}
                        />
                    )}
                </View>

                <Text style={styles.date}>
                    {formatDate(crime.date)}
                </Text>

                <Text style={styles.time}>
                    {formatTime(crime.date)}
                </Text>

                {crime.details && (
                    <Text style={styles.details} numberOfLines={2}>
                        {crime.details}
                    </Text>
                )}
            </View>

            <View style={styles.rightSection}>
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                />
            </View>
        </TouchableOpacity>
    );
}