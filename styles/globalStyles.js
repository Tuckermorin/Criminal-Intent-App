// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

// Spacing constants
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

// Font sizes
export const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
    header: 32,
};

// Border radius
export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
};

// Shadow styles
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
};

// Create global styles function that accepts theme
export const createGlobalStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    screenPadding: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },

    card: {
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginVertical: spacing.sm,
        ...shadows.sm,
    },

    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.sm,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: fontSize.md,
        fontWeight: '600',
    },

    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.md,
        color: theme.colors.text,
    },

    text: {
        color: theme.colors.text,
        fontSize: fontSize.md,
    },

    textSecondary: {
        color: theme.colors.textSecondary,
        fontSize: fontSize.sm,
    },

    title: {
        color: theme.colors.text,
        fontSize: fontSize.title,
        fontWeight: 'bold',
    },

    header: {
        color: theme.colors.text,
        fontSize: fontSize.header,
        fontWeight: 'bold',
    },

    listItem: {
        backgroundColor: theme.colors.card,
        padding: spacing.md,
        marginVertical: spacing.xs,
        marginHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...shadows.sm,
    },

    separator: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: spacing.sm,
    },

    centeredContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});