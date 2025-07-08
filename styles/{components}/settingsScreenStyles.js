// src/styles/components/settingsScreenStyles.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, borderRadius, shadows } from '../globalStyles';

export const createSettingsScreenStyles = (theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: spacing.md,
    },

    section: {
        marginBottom: spacing.xl,
    },

    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: spacing.lg,
    },

    infoCard: {
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...shadows.sm,
    },

    appName: {
        fontSize: fontSize.title,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: spacing.xs,
    },

    appVersion: {
        fontSize: fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: spacing.md,
    },

    appDescription: {
        fontSize: fontSize.md,
        color: theme.colors.text,
        lineHeight: fontSize.md * 1.4,
    },
});