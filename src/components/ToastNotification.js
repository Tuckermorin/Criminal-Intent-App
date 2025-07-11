// src/components/ToastNotification.js - Professional Toast Component (Safe for testing)
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text } from 'react-native';
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

const { width } = getDimensions();

const ToastNotification = ({ visible, message, type = 'success', duration = 3000, onHide }) => {
    const { theme } = useTheme();
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (visible) {
            // Slide in
            Animated.timing(slideAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Auto hide after duration
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onHide && onHide();
        });
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return theme.colors.success;
            case 'error':
                return theme.colors.error;
            case 'warning':
                return theme.colors.warning;
            default:
                return theme.colors.primary;
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    if (!visible) return null;

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 16,
                right: 16,
                transform: [{ translateY: slideAnim }],
                backgroundColor: getBackgroundColor(),
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                zIndex: 1000,
            }}
        >
            <Text style={{
                color: '#FFFFFF',
                fontSize: 18,
                marginRight: 12,
                fontWeight: 'bold',
            }}>
                {getIcon()}
            </Text>
            <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '500',
                flex: 1,
            }}>
                {message}
            </Text>
        </Animated.View>
    );
};

export default ToastNotification;