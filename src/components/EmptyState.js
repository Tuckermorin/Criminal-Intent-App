// src/components/EmptyState.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createEmptyStateStyles } from '../styles/components/emptyStateStyles';

export default function EmptyState({
    title,
    message,
    onAction,
    actionText,
    iconName = 'document-text-outline'
}) {
    const { theme, globalStyles } = useTheme();
    const styles = createEmptyStateStyles(theme);

    return (
        <View style={styles.container}>
            <Ionicons
                name={iconName}
                size={80}
                color={theme.colors.textSecondary}
                style={styles.icon}
            />

            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.message}>
                {message}
            </Text>

            {onAction && actionText && (
                <TouchableOpacity
                    style={[globalStyles.button, styles.actionButton]}
                    onPress={onAction}
                    activeOpacity={0.8}
                >
                    <Text style={globalStyles.buttonText}>
                        {actionText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}