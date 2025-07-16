// app/index.js - Main Screen using Expo Router
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CrimeListItem from '../src/components/CrimeListItem';
import EmptyState from '../src/components/EmptyState';
import { useTheme } from '../src/context/ThemeContext';
import { getAllCrimes } from '../src/storage/crimeStorage';

export default function IndexScreen() {
    const { theme, globalStyles } = useTheme();
    const router = useRouter();
    const [crimes, setCrimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Load crimes when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadCrimes();
        }, [])
    );

    const loadCrimes = async () => {
        setIsLoading(true);
        try {
            const crimesData = await getAllCrimes();
            setCrimes(crimesData);
        } catch (error) {
            console.error('Error loading crimes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadCrimes();
        setIsRefreshing(false);
    };

    const handleCrimePress = (crimeId) => {
        router.push(`/detail?crimeId=${crimeId}`);
    };

    const handleAddCrime = () => {
        router.push('/detail');
    };

    const renderCrimeItem = ({ item }) => (
        <CrimeListItem
            crime={item}
            onPress={() => handleCrimePress(item.id)}
        />
    );

    const renderEmptyComponent = () => (
        <EmptyState
            title="No Crimes Reported"
            message="Tap the + button to add your first crime report"
            onAction={handleAddCrime}
            actionText="Add Crime"
            testID="add-crime-button"
        />
    );

    return (
        <View style={[globalStyles.container]}>
            {/* Add Crime Button - Fixed Position */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 30,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                onPress={handleAddCrime}
                testID="add-crime-button"
            >
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <FlatList
                data={crimes}
                renderItem={renderCrimeItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={crimes.length === 0 ? globalStyles.centeredContent : null}
                ListEmptyComponent={renderEmptyComponent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.colors.primary}
                        colors={[theme.colors.primary]}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: theme.colors.background }}
            />
        </View>
    );
}