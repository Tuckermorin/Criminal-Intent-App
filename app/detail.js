// app/detail.js - Detail Screen using Expo Router (Fixed for testing)
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    Pressable,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationModal from '../src/components/ConfirmationModal';
import DatePickerModal from '../src/components/DatePickerModal';
import ToastNotification from '../src/components/ToastNotification';
import PhotoSection from '../src/components/PhotoSection';
import CrimeForm from '../src/components/CrimeForm';
import CrimeActions from '../src/components/CrimeActions';
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
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast({ message: '', type: 'success' });
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
                message={toast.message}
                type={toast.type}
                onDismiss={hideToast}
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
                <PhotoSection
                    photoUri={crime.photoUri}
                    onPickImage={handleImagePicker}
                />

                {/* Crime Form Fields */}
                <CrimeForm
                    crime={crime}
                    titleError={titleError}
                    onTitleChange={handleTitleChange}
                    onDetailsChange={handleDetailsChange}
                    onDatePress={() => setShowDatePicker(true)}
                    onSolvedToggle={handleSolvedToggle}
                />

                {/* Save/Delete Actions */}
                <CrimeActions
                    onSave={handleSave}
                    onDelete={handleDelete}
                    isExistingCrime={isExistingCrime}
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                />
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