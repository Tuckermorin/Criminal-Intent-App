import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createDetailScreenStyles } from '../styles/components/detailScreenStyles';

export default function CrimeActions({
    onSave,
    onDelete,
    isExistingCrime,
    isSaving,
    isDeleting,
}) {
    const { theme, globalStyles } = useTheme();
    const styles = createDetailScreenStyles(theme);

    return (
        <View>
            <Pressable
                onPress={onSave}
                disabled={isSaving || isDeleting}
                testID="save-button"
                style={({ pressed }) => [
                    globalStyles.button,
                    styles.saveButton,
                    pressed && { opacity: 0.8 },
                ]}
            >
                <Text style={globalStyles.buttonText}>
                    {isSaving ? 'Saving...' : 'Save'}
                </Text>
            </Pressable>

            {isExistingCrime && (
                <Pressable
                    onPress={onDelete}
                    disabled={isSaving || isDeleting}
                    style={({ pressed }) => [
                        styles.deleteButton,
                        pressed && { opacity: 0.8 },
                    ]}
                >
                    <Text style={styles.deleteButtonText}>
                        {isDeleting ? 'Deleting...' : 'DELETE CRIME'}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}
