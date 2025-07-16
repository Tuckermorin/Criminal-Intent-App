import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { createDetailScreenStyles } from '../styles/components/detailScreenStyles';

export default function PhotoSection({ photoUri, onPickImage }) {
    const { theme } = useTheme();
    const styles = createDetailScreenStyles(theme);

    return (
        <View style={styles.photoSection}>
            {photoUri ? (
                <View style={styles.photoContainer}>
                    <Image source={{ uri: photoUri }} style={styles.photo} />
                    <Pressable
                        onPress={onPickImage}
                        style={({ pressed }) => [
                            styles.photoButton,
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <Ionicons name="camera" style={styles.photoButtonText} />
                    </Pressable>
                </View>
            ) : (
                <Pressable
                    onPress={onPickImage}
                    style={({ pressed }) => [
                        styles.photoPlaceholder,
                        pressed && { opacity: 0.7 },
                    ]}
                >
                    <Ionicons name="camera" style={styles.photoPlaceholderIcon} />
                    <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </Pressable>
            )}
        </View>
    );
}
