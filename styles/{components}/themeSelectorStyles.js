// src/styles/components/themeSelectorStyles.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, borderRadius, shadows } from '../globalStyles';

export const createThemeSelectorStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },

    groupTitle: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: spacing.md,
        marginTop: spacing.lg,
    },

    themeOption: {
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shadows.sm,
    },

    themeOptionSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.surface,
        ...shadows.md,
    },

    themeInfo: {
        flex: 1,
    },

    themeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },

    themeColorPreview: {
        width: 20,
        height: 20,
        borderRadius: borderRadius.sm,
        marginRight: spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    themeName: {
        fontSize: fontSize.md,
        fontWeight: '600',
        color: theme.colors.text,
        flex: 1,
    },

    themeType: {
        fontSize: fontSize.sm,
        color: theme.colors.textSecondary,
        backgroundColor: theme.colors.background,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        overflow: 'hidden',
    },

    colorPalette: {
        flexDirection: 'row',
        marginLeft: spacing.lg + 20, // Align with theme name
    },

    colorSwatch: {
        width: 16,
        height: 16,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    checkIcon: {
        marginLeft: spacing.md,
    },
});