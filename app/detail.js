// app/detail.js - FIXED Detail Screen with proper imports
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import ConfirmationModal from '../src/components/ConfirmationModal';
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
                <View style={styles.photoSection}>
                    {crime.photoUri ? (
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: crime.photoUri }} style={styles.photo} />
                            <Pressable
                                onPress={handleImagePicker}
                                style={({ pressed }) => [
                                    styles.photoButton,
                                    pressed && { opacity: 0.7 },
                                ]}
                            >
                                <Ionicons name="camera" size={16} color="#FFFFFF" />
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable
                            onPress={handleImagePicker}
                            style={({ pressed }) => [
                                styles.photoPlaceholder,
                                pressed && { opacity: 0.7 },
                            ]}
                        >
                            <Ionicons name="camera" size={32} color={theme.colors.placeholder} />
                            <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                        </Pressable>
                    )}
                </View>

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
                    <Pressable
                        onPress={() => setShowDatePicker(true)}
                        style={({ pressed }) => [
                            styles.dateButton,
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <Text style={styles.dateButtonText}>
                            {formatDateForDisplay(crime.date)}
                        </Text>
                        <Ionicons name="calendar" size={20} color="#FFFFFF" />
                    </Pressable>
                </View>

                {/* Solved Checkbox */}
                <View style={styles.section}>
                    <Pressable
                        onPress={handleSolvedToggle}
                        style={({ pressed }) => [
                            styles.checkboxRow,
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <View style={[styles.checkbox, crime.solved && styles.checkboxChecked]}>
                            {crime.solved && (
                                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                            )}
                        </View>
                        <Text style={styles.checkboxLabel}>Solved</Text>
                    </Pressable>
                </View>

                {/* Save Button */}
                <Pressable
                    onPress={handleSave}
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

                {/* Delete Button - Only show for existing crimes */}
                {isExistingCrime && (
                    <Pressable
                        onPress={handleDelete}
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
            </ScrollView>

            {/* Date Picker - Proper Modal */}
            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: 12,
                        padding: 20,
                        margin: 20,
                        width: '80%',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 8,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: theme.colors.text,
                            textAlign: 'center',
                            marginBottom: 20
                        }}>
                            Select Date
                        </Text>
                        
                        <DateTimePicker
                            value={new Date(crime.date)}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setCrime(prev => ({ ...prev, date: selectedDate.toISOString() }));
                                }
                            }}
                            style={{ backgroundColor: theme.colors.surface }}
                        />
                        
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}>
                            <Pressable
                                onPress={() => setShowDatePicker(false)}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 6,
                                    backgroundColor: theme.colors.border
                                }}
                            >
                                <Text style={{ color: theme.colors.text }}>Cancel</Text>
                            </Pressable>
                            
                            <Pressable
                                onPress={() => setShowDatePicker(false)}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 6,
                                    backgroundColor: theme.colors.primary
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}