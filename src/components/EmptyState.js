// src/components/EmptyState.js - Updated with testID support
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createEmptyStateStyles } from '../styles/components/emptyStateStyles';

export default function EmptyState({
    title,
    message,
    onAction,
    actionText,
    testID
}) {
    const { theme, globalStyles } = useTheme();
    const styles = createEmptyStateStyles(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.iconPlaceholder}>📄</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {onAction && actionText && (
                <TouchableOpacity
                    style={[globalStyles.button, styles.actionButton]}
                    onPress={onAction}
                    activeOpacity={0.8}
                    testID={testID}
                >
                    <Text style={globalStyles.buttonText}>{actionText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}