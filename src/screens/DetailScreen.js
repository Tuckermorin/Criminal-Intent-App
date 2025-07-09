// src/screens/DetailScreen.js - With Delete Functionality
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DatePickerModal from '../components/DatePickerModal';
import { useTheme } from '../context/ThemeContext';
import { createCrime, deleteCrime, getCrimeById, saveCrime } from '../storage/crimeStorage';
import { createDetailScreenStyles } from '../styles/components/detailScreenStyles';

export default function DetailScreen({ route, navigation }) {
    const { crimeId } = route.params;
    const { theme, globalStyles } = useTheme();
    const styles = createDetailScreenStyles(theme);

    const [crime, setCrime] = useState(createCrime());
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Check if this is an existing crime (has crimeId) or new crime
    const isExistingCrime = crimeId !== null;

    useEffect(() => {
        if (crimeId) {
            loadCrime();
        }
    }, [crimeId]);

    const loadCrime = async () => {
        setIsLoading(true);
        try {
            const crimeData = await getCrimeById(crimeId);
            if (crimeData) {
                setCrime(crimeData);
            }
        } catch (error) {
            console.error('Error loading crime:', error);
            Alert.alert('Error', 'Failed to load crime data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!crime.title.trim()) {
            Alert.alert('Error', 'Please enter a title for the crime');
            return;
        }

        setIsSaving(true);
        try {
            const success = await saveCrime(crime);
            if (success) {
                Alert.alert('Success', 'Crime saved successfully', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', 'Failed to save crime');
            }
        } catch (error) {
            console.error('Error saving crime:', error);
            Alert.alert('Error', 'Failed to save crime');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Delete Crime',
            'Are you sure you want to delete this crime? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: confirmDelete,
                },
            ]
        );
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const success = await deleteCrime(crimeId);
            if (success) {
                Alert.alert('Success', 'Crime deleted successfully', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', 'Failed to delete crime');
            }
        } catch (error) {
            console.error('Error deleting crime:', error);
            Alert.alert('Error', 'Failed to delete crime');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleTitleChange = (text) => {
        setCrime(prev => ({ ...prev, title: text }));
    };

    const handleDetailsChange = (text) => {
        setCrime(prev => ({ ...prev, details: text }));
    };

    const handleDateChange = (selectedDate) => {
        setCrime(prev => ({ ...prev, date: selectedDate.toISOString() }));
        setShowDatePicker(false);
    };

    const handleSolvedToggle = () => {
        setCrime(prev => ({ ...prev, solved: !prev.solved }));
    };

    const handleImagePicker = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to select photos.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setCrime(prev => ({ ...prev, photoUri: result.assets[0].uri }));
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to select image');
        }
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <View style={[globalStyles.container, globalStyles.centeredContent]}>
                <Text style={globalStyles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[globalStyles.container]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Photo Section */}
                <View style={styles.photoSection}>
                    {crime.photoUri ? (
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: crime.photoUri }} style={styles.photo} />
                            <TouchableOpacity
                                style={styles.photoButton}
                                onPress={handleImagePicker}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.photoButtonText}>📷</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.photoPlaceholder}
                            onPress={handleImagePicker}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.photoPlaceholderIcon}>📷</Text>
                            <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Title Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={[globalStyles.input, styles.titleInput]}
                        value={crime.title}
                        onChangeText={handleTitleChange}
                        placeholder="Enter crime title"
                        placeholderTextColor={theme.colors.placeholder}
                    />
                </View>

                {/* Details Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Details</Text>
                    <TextInput
                        style={[globalStyles.input, styles.detailsInput]}
                        value={crime.details}
                        onChangeText={handleDetailsChange}
                        placeholder="What happened?"
                        placeholderTextColor={theme.colors.placeholder}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Date Section */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.dateButtonText}>
                            {formatDateForDisplay(crime.date)}
                        </Text>
                        <Text style={styles.dateButtonIcon}>📅</Text>
                    </TouchableOpacity>
                </View>

                {/* Solved Checkbox */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={handleSolvedToggle}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, crime.solved && styles.checkboxChecked]}>
                            {crime.solved && (
                                <Text style={styles.checkmarkText}>✓</Text>
                            )}
                        </View>
                        <Text style={styles.checkboxLabel}>Solved</Text>
                    </TouchableOpacity>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[globalStyles.button, styles.saveButton]}
                    onPress={handleSave}
                    disabled={isSaving || isDeleting}
                    activeOpacity={0.8}
                >
                    <Text style={globalStyles.buttonText}>
                        {isSaving ? 'Saving...' : 'SAVE'}
                    </Text>
                </TouchableOpacity>

                {/* Delete Button - Only show for existing crimes */}
                {isExistingCrime && (
                    <TouchableOpacity
                        style={[styles.deleteButton]}
                        onPress={handleDelete}
                        disabled={isSaving || isDeleting}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.deleteButtonText}>
                            {isDeleting ? 'Deleting...' : 'DELETE CRIME'}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Date Picker Modal */}
            <DatePickerModal
                visible={showDatePicker}
                date={new Date(crime.date)}
                onDateChange={handleDateChange}
                onCancel={() => setShowDatePicker(false)}
            />
        </View>
    );
}