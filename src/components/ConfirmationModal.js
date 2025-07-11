// src/components/ConfirmationModal.js - Safer version for testing
import React from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Safely get dimensions with fallback for testing
const getDimensions = () => {
  try {
    return Dimensions.get('window');
  } catch (error) {
    // Fallback for testing environment
    return { width: 375, height: 812 };
  }
};

const { width, height } = getDimensions();

const ConfirmationModal = ({ 
    visible, 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel', 
    onConfirm, 
    onCancel,
    type = 'default' // 'default', 'destructive'
}) => {
    const { theme } = useTheme();

    const getConfirmButtonColor = () => {
        return type === 'destructive' ? theme.colors.error : theme.colors.primary;
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
                <View style={{
                    backgroundColor: theme.colors.surface,
                    borderRadius: 16,
                    padding: 24,
                    width: width * 0.85,
                    maxWidth: 400,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 10,
                    elevation: 12,
                }}>
                    {/* Title */}
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        marginBottom: 12,
                        textAlign: 'center',
                    }}>
                        {title}
                    </Text>

                    {/* Message */}
                    <Text style={{
                        fontSize: 16,
                        color: theme.colors.textSecondary,
                        lineHeight: 24,
                        textAlign: 'center',
                        marginBottom: 24,
                    }}>
                        {message}
                    </Text>

                    {/* Buttons */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 12,
                    }}>
                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: theme.colors.card,
                                borderWidth: 1,
                                borderColor: theme.colors.border,
                                borderRadius: 12,
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                            }}
                            onPress={onCancel}
                            activeOpacity={0.7}
                        >
                            <Text style={{
                                color: theme.colors.text,
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                                {cancelText}
                            </Text>
                        </TouchableOpacity>

                        {/* Confirm Button */}
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: getConfirmButtonColor(),
                                borderRadius: 12,
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                            onPress={onConfirm}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                color: '#FFFFFF',
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                                {confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;