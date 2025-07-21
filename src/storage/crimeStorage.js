// src/storage/crimeStorage.js - Fixed with expo-crypto
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';

// Storage keys
const CRIMES_STORAGE_KEY = '@criminal_intent_crimes';
const CRIME_COUNTER_KEY = '@criminal_intent_counter';

// Crime data structure
export const createCrime = (overrides = {}) => ({
    id: randomUUID(),
    title: '',
    details: '',
    date: new Date().toISOString(),
    solved: false,
    photoUri: null,
    createdAt: new Date().toISOString(),
    ...overrides,
});

// Get all crimes
export const getAllCrimes = async () => {
    try {
        const crimesJson = await AsyncStorage.getItem(CRIMES_STORAGE_KEY);
        if (crimesJson) {
            const crimes = JSON.parse(crimesJson);
            // Sort by creation date, newest first
            return crimes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return [];
    } catch (error) {
        console.error('Error getting crimes:', error);
        return [];
    }
};

// Get single crime by ID
export const getCrimeById = async (crimeId) => {
    try {
        const crimes = await getAllCrimes();
        return crimes.find(crime => crime.id === crimeId) || null;
    } catch (error) {
        console.error('Error getting crime by ID:', error);
        return null;
    }
};

// Save crime (create or update)
export const saveCrime = async (crime) => {
    try {
        const crimes = await getAllCrimes();
        const existingIndex = crimes.findIndex(c => c.id === crime.id);

        if (existingIndex >= 0) {
            // Update existing crime
            crimes[existingIndex] = { ...crimes[existingIndex], ...crime };
        } else {
            // Add new crime
            crimes.push(crime);
        }

        await AsyncStorage.setItem(CRIMES_STORAGE_KEY, JSON.stringify(crimes));
        return true;
    } catch (error) {
        console.error('Error saving crime:', error);
        return false;
    }
};

// Delete crime
export const deleteCrime = async (crimeId) => {
    try {
        const crimes = await getAllCrimes();
        const filteredCrimes = crimes.filter(crime => crime.id !== crimeId);
        await AsyncStorage.setItem(CRIMES_STORAGE_KEY, JSON.stringify(filteredCrimes));
        return true;
    } catch (error) {
        console.error('Error deleting crime:', error);
        return false;
    }
};

// Get crimes count
export const getCrimesCount = async () => {
    try {
        const crimes = await getAllCrimes();
        return crimes.length;
    } catch (error) {
        console.error('Error getting crimes count:', error);
        return 0;
    }
};

// Clear all crimes (useful for testing)
export const clearAllCrimes = async () => {
    try {
        await AsyncStorage.removeItem(CRIMES_STORAGE_KEY);
        await AsyncStorage.removeItem(CRIME_COUNTER_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing crimes:', error);
        return false;
    }
};

// Get solved crimes
export const getSolvedCrimes = async () => {
    try {
        const crimes = await getAllCrimes();
        return crimes.filter(crime => crime.solved);
    } catch (error) {
        console.error('Error getting solved crimes:', error);
        return [];
    }
};

// Get unsolved crimes
export const getUnsolvedCrimes = async () => {
    try {
        const crimes = await getAllCrimes();
        return crimes.filter(crime => !crime.solved);
    } catch (error) {
        console.error('Error getting unsolved crimes:', error);
        return [];
    }
};