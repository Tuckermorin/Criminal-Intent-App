// src/screens/IndexScreen.js
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import CrimeListItem from '../components/CrimeListItem';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../context/ThemeContext';
import { getAllCrimes } from '../storage/crimeStorage';

export default function IndexScreen({ navigation }) {
    const { theme, globalStyles } = useTheme();
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
        navigation.navigate('Detail', { crimeId });
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
            onAction={() => navigation.navigate('Detail', { crimeId: null })}
            actionText="Add Crime"
        />
    );

    return (
        <View style={[globalStyles.container]}>
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