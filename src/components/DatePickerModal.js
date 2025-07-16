
// src/components/DatePickerModal.js - No Icons Version
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Text, Pressable, View } from 'react-native';

// src/components/DatePickerModal.js
import React from 'react';
import { View, Text, Modal, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useTheme } from '../context/ThemeContext';
import { createDatePickerStyles } from '../styles/components/datePickerStyles';

export default function DatePickerModal({ visible, date, onDateChange, onCancel }) {
    const { theme } = useTheme();
    const styles = createDatePickerStyles(theme);

    const [selectedDate, setSelectedDate] = useState(date);

    useEffect(() => {
        if (visible) {
            setSelectedDate(date);
        }
    }, [visible, date]);

    const handleDateChange = (event, chosenDate) => {
        if (Platform.OS === 'android') {
            if (event.type === 'set' && chosenDate) {
                onDateChange(chosenDate);
            } else {
                onCancel();
            }
        } else if (chosenDate) {
            setSelectedDate(chosenDate);
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
                        value={selectedDate}
                        mode="date"
                        display="wheels"
                        onChange={handleDateChange}
                        textColor={theme.colors.text}
                        style={styles.picker}
                    />

                    <View style={styles.buttonRow}>
                        <Pressable
                            onPress={onCancel}
                            style={({ pressed }) => [
                                styles.button,
                                styles.cancelButton,
                                pressed && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => onDateChange(selectedDate)}
                            style={({ pressed }) => [
                                styles.button,
                                styles.okButton,
                                pressed && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}