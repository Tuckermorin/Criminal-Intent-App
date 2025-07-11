// app/detail.js - Detail Screen using Expo Router (Fixed for testing)
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ConfirmationModal from '../src/components/ConfirmationModal';
import DatePickerModal from '../src/components/DatePickerModal';
import ToastNotification from '../src/components/ToastNotification';
import { useTheme } from '../src/context/ThemeContext';
import { createCrime, deleteCrime, getCrimeById, saveCrime } from '../src/storage/crimeStorage';
import { createDetailScreenStyles } from '../src/styles/components/detailScreenStyles';
import {
    canSaveCrime,
    getCrimeValidationMessage,
    sanitizeCrimeData,
    validateCrimeTitle
} from '../src/utils/crimeValidation';
import { formatDateForDisplay } from '../src/utils/dateUtils';

// Custom hook for safe navigation with cleanup
const useSafeNavigation = () => {
    const router = useRouter();
    const timeoutRefs = useRef([]);

    const safeNavigateBack = (delay = 0) => {
        if (delay > 0) {
            const timeoutId = setTimeout(() => {
                if (router) {
                    router.back();
                }
            }, delay);
            timeoutRefs.current.push(timeoutId);
        } else {
            if (router) {
                router.back();
            }
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup all timeouts on unmount
            timeoutRefs.current.forEach(clearTimeout);
        };
    }, []);

    return { safeNavigateBack };
};

export default function DetailScreen() {
    const { crimeId } = useLocalSearchParams();
    const { theme, globalStyles } = useTheme();
    const { safeNavigateBack } = useSafeNavigation();
    const styles = createDetailScreenStyles(theme);

    const [crime, setCrime] = useState(createCrime());
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [titleError, setTitleError] = useState(null);
    
    // Toast notification state
    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({
        visible: false,
        title: '',
        message: '',
        onConfirm: () => {},
        type: 'default'
    });

    // Check if this is an existing crime (has crimeId) or new crime
    const isExistingCrime = crimeId !== undefined;

    useEffect(() => {
        if (crimeId) {
            loadCrime();
        }
    }, [crimeId]);

    const showToast = (message, type = 'success') => {
        setToast({ visible: true, message, type });
    };

    const hideToast = () => {
        setToast({ visible: false, message: '', type: 'success' });
    };

    const showConfirmation = (title, message, onConfirm, type = 'default') => {
        setConfirmModal({
            visible: true,
            title,
            message,
            onConfirm,
            type
        });
    };

    const hideConfirmation = () => {
        setConfirmModal({
            visible: false,
            title: '',
            message: '',
            onConfirm: () => {},
            type: 'default'
        });
    };

    const loadCrime = async () => {
        setIsLoading(true);
        try {
            const crimeData = await getCrimeById(crimeId);
            if (crimeData) {
                setCrime(crimeData);
            }
        } catch (error) {
            console.error('Error loading crime:', error);
            showToast('Failed to load crime data', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        // Sanitize the crime data before validation
        const sanitizedCrime = sanitizeCrimeData(crime);
        
        if (!sanitizedCrime) {
            showToast('Invalid crime data', 'error');
            return;
        }

        // Check if crime can be saved
        if (!canSaveCrime(sanitizedCrime)) {
            const validationMessage = getCrimeValidationMessage(sanitizedCrime);
            showToast(validationMessage, 'warning');
            return;
        }

        setIsSaving(true);
        try {
            const success = await saveCrime(sanitizedCrime);
            if (success) {
                showToast('Crime saved successfully!', 'success');
                // Navigate back after a short delay to show the toast
                safeNavigateBack(1500);
            } else {
                showToast('Failed to save crime', 'error');
            }
        } catch (error) {
            console.error('Error saving crime:', error);
            showToast('Failed to save crime', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = () => {
        showConfirmation(
            'Delete Crime',
            'Are you sure you want to delete this crime? This action cannot be undone.',
            confirmDelete,
            'destructive'
        );
    };

    const confirmDelete = async () => {
        hideConfirmation();
        setIsDeleting(true);
        try {
            const success = await deleteCrime(crimeId);
            if (success) {
                showToast('Crime deleted successfully', 'success');
                // Navigate back after a short delay
                safeNavigateBack(1500);
            } else {
                showToast('Failed to delete crime', 'error');
            }
        } catch (error) {
            console.error('Error deleting crime:', error);
            showToast('Failed to delete crime', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleTitleChange = (text) => {
        setCrime(prev => ({ ...prev, title: text }));
        
        // Validate title in real-time
        const titleValidation = validateCrimeTitle(text);
        setTitleError(titleValidation.isValid ? null : titleValidation.error);
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
                showToast('Camera roll permission required to select photos', 'warning');
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
                showToast('Photo added successfully', 'success');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            showToast('Failed to select image', 'error');
        }
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
            {/* Toast Notification */}
            <ToastNotification
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={hideToast}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                visible={confirmModal.visible}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onCancel={hideConfirmation}
                type={confirmModal.type}
                confirmText={confirmModal.type === 'destructive' ? 'Delete' : 'Confirm'}
            />

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
                        style={[
                            globalStyles.input, 
                            styles.titleInput,
                            titleError && { borderColor: theme.colors.error }
                        ]}
                        value={crime.title}
                        onChangeText={handleTitleChange}
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
                        onChangeText={handleDetailsChange}
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
                    testID="save-button"
                >
                    <Text style={globalStyles.buttonText}>
                        {isSaving ? 'Saving...' : 'Save'}
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