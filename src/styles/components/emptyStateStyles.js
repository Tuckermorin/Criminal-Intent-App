// src/styles/components/emptyStateStyles.js
import { StyleSheet } from 'react-native';
import { fontSize, spacing } from '../globalStyles';

export const createEmptyStateStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },

    icon: {
        marginBottom: spacing.lg,
        opacity: 0.6,
    },

    title: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: spacing.md,
        textAlign: 'center',
    },

    message: {
        fontSize: fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: fontSize.md * 1.4,
        marginBottom: spacing.xl,
    },

    actionButton: {
        minWidth: 140,
    },
});