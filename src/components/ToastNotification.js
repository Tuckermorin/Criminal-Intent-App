import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * ToastNotification component
 *
 * @param {Object} props
 * @param {string} props.message - Message to display
 * @param {"success" | "error"} [props.type] - Toast type
 * @param {Function} [props.onDismiss] - Called when toast disappears
 */
export default function ToastNotification({
  message,
  type = 'success',
  onDismiss,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <View
      style={[
        styles.toast,
        type === 'error' ? styles.error : styles.success,
      ]}
      testID="toast-notification"
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#10B981',
  },
  error: {
    backgroundColor: '#EF4444',
  },
});
