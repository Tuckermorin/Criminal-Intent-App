import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { createDetailScreenStyles } from '../styles/components/detailScreenStyles';
import { formatDateForDisplay } from '../utils/dateUtils';

export default function CrimeForm({
    crime,
    titleError,
    onTitleChange,
    onDetailsChange,
    onDatePress,
    onSolvedToggle,
}) {
    const { theme, globalStyles } = useTheme();
    const styles = createDetailScreenStyles(theme);

    return (
        <>
            {/* Title Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={[
                        globalStyles.input,
                        styles.titleInput,
                        titleError && { borderColor: theme.colors.error },
                    ]}
                    value={crime.title}
                    onChangeText={onTitleChange}
                    placeholder="Title"
                    placeholderTextColor={theme.colors.placeholder}
                    testID="title-input"
                />
                {titleError && (
                    <Text style={{ color: theme.colors.error, fontSize: 14, marginTop: 4 }}>
                        {titleError}
                    </Text>
                )}
            </View>

            {/* Details Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Details</Text>
                <TextInput
                    style={[globalStyles.input, styles.detailsInput]}
                    value={crime.details}
                    onChangeText={onDetailsChange}
                    placeholder="What happened?"
                    placeholderTextColor={theme.colors.placeholder}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    testID="details-input"
                />
            </View>

            {/* Date Section */}
            <View style={styles.section}>
                <Pressable
                    onPress={onDatePress}
                    style={({ pressed }) => [
                        styles.dateButton,
                        pressed && { opacity: 0.7 },
                    ]}
                >
                    <Text style={styles.dateButtonText}>
                        {formatDateForDisplay(crime.date)}
                    </Text>
                    <Ionicons name="calendar" style={styles.dateButtonIcon} />
                </Pressable>
            </View>

            {/* Solved Checkbox */}
            <View style={styles.section}>
                <Pressable
                    onPress={onSolvedToggle}
                    style={({ pressed }) => [
                        styles.checkboxRow,
                        pressed && { opacity: 0.7 },
                    ]}
                >
                    <View style={[styles.checkbox, crime.solved && styles.checkboxChecked]}>
                        {crime.solved && (
                            <Ionicons name="checkmark-circle" style={styles.checkmarkText} />
                        )}
                    </View>
                    <Text style={styles.checkboxLabel}>Solved</Text>
                </Pressable>
            </View>
        </>
    );
}
