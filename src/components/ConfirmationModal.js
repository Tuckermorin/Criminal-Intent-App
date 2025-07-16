import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ConfirmationModal({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'default'
}) {
    const { theme, globalStyles } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.colors.surface,
                        padding: 20,
                        borderRadius: 8,
                        width: '80%'
                    }}
                >
                    {title && (
                        <Text style={[globalStyles.title, { marginBottom: 10 }]}>{title}</Text>
                    )}
                    {message && (
                        <Text style={{ marginBottom: 20, color: theme.colors.text }}>{message}</Text>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Pressable onPress={onCancel} style={{ marginRight: 16 }}>
                            <Text style={{ color: theme.colors.primary }}>{cancelText}</Text>
                        </Pressable>
                        <Pressable onPress={onConfirm}>
                            <Text style={{ color: type === 'destructive' ? theme.colors.error : theme.colors.primary }}>
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

