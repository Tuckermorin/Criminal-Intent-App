// src/styles/components/detailScreenStyles.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, borderRadius } from '../globalStyles';

export const createDetailScreenStyles = (theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: spacing.md,
    },

    photoSection: {
        marginBottom: spacing.lg,
    },

    photoContainer: {
        position: 'relative',
        alignSelf: 'flex-start',
    },

    photo: {
        width: 120,
        height: 90,
        borderRadius: borderRadius.md,
        backgroundColor: theme.colors.card,
    },

    photoButton: {
        position: 'absolute',
        bottom: -8,
        right: -8,
        backgroundColor: theme.colors.primary,
        borderRadius: borderRadius.full,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    photoPlaceholder: {
        width: 120,
        height: 90,
        backgroundColor: theme.colors.card,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },

    photoPlaceholderText: {
        fontSize: fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: spacing.xs,
    },

    section: {
        marginBottom: spacing.lg,
    },

    label: {
        fontSize: fontSize.md,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: spacing.sm,
    },

    titleInput: {
        fontSize: fontSize.lg,
        fontWeight: '500',
    },

    detailsInput: {
        height: 100,
        textAlignVertical: 'top',
    },

    dateButton: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    dateButtonText: {
        color: '#FFFFFF',
        fontSize: fontSize.md,
        fontWeight: '500',
        flex: 1,
    },

    dateButtonIcon: {
        color: '#FFFFFF',
        marginLeft: spacing.sm,
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: borderRadius.sm,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    checkboxChecked: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },

    checkmarkText: {
        color: '#FFFFFF',
    },

    checkboxLabel: {
        fontSize: fontSize.md,
        color: theme.colors.text,
        fontWeight: '500',
    },

    photoButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },

    photoPlaceholderIcon: {
        color: theme.colors.placeholder,
        fontSize: 32,
    },

    deleteButton: {
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
        alignItems: 'center',
        backgroundColor: theme.colors.error,
        borderRadius: borderRadius.md,
    },

    deleteButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },

    saveButton: {
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
    },
});