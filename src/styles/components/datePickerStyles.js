// src/styles/components/datePickerStyles.js
import { StyleSheet } from 'react-native';
import { spacing, fontSize, borderRadius } from '../globalStyles';

export const createDatePickerStyles = (theme) => StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.lg,
        marginHorizontal: spacing.lg,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    header: {
        backgroundColor: theme.colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
    },

    title: {
        color: '#FFFFFF',
        fontSize: fontSize.lg,
        fontWeight: '600',
    },

    picker: {
        backgroundColor: theme.colors.surface,
    },

    buttonRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },

    button: {
        flex: 1,
        paddingVertical: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButton: {
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
    },

    cancelButtonText: {
        color: theme.colors.textSecondary,
        fontSize: fontSize.md,
        fontWeight: '500',
    },

    okButton: {
        backgroundColor: theme.colors.primary,
    },

    okButtonText: {
        color: '#FFFFFF',
        fontSize: fontSize.md,
        fontWeight: '600',
    },
});