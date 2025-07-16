import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToastNotification({ visible, message, type = 'success', onHide }) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      if (onHide) onHide();
    }, 3000);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <View
      style={[
        styles.toast,
        type === 'error' ? styles.error : styles.success,
      ]}
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
