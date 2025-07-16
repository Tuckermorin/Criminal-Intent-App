// src/styles/components/crimeItemStyles.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize } from '../globalStyles';

export const createCrimeItemStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    content: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },

    title: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        flex: 1,
        marginRight: spacing.sm,
    },

    solvedIcon: {
        marginLeft: spacing.sm,
    },

    date: {
        fontSize: fontSize.sm,
        color: theme.colors.primary,
        fontWeight: '500',
        marginBottom: spacing.xs,
    },

    time: {
        fontSize: fontSize.xs,
        color: theme.colors.textSecondary,
        marginBottom: spacing.sm,
    },

    details: {
        fontSize: fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: fontSize.sm * 1.3,
    },

    rightSection: {
        marginLeft: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
});