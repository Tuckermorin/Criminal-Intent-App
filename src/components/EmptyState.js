// src/components/EmptyState.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
                <Pressable
                    onPress={onAction}
                    style={({ pressed }) => [
                        globalStyles.button,
                        styles.actionButton,
                        pressed && { opacity: 0.8 },
                    ]}
                >
                    <Text style={globalStyles.buttonText}>
                        {actionText}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}