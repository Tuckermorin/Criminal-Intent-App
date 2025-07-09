// src/components/DatePickerModal.js - No Icons Version
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createDatePickerStyles } from '../styles/components/datePickerStyles';

export default function DatePickerModal({ visible, date, onDateChange, onCancel }) {
    const { theme, globalStyles } = useTheme();
    const styles = createDatePickerStyles(theme);

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            if (event.type === 'set' && selectedDate) {
                onDateChange(selectedDate);
            } else {
                onCancel();
            }
        } else if (selectedDate) {
            onDateChange(selectedDate);
        }
    };

    if (Platform.OS === 'android') {
        return visible ? (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
            />
        ) : null;
    }

    // iOS Modal
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Date</Text>
                    </View>

                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="wheels"
                        onChange={handleDateChange}
                        textColor={theme.colors.text}
                        style={styles.picker}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.okButton]}
                            onPress={() => onDateChange(date)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}