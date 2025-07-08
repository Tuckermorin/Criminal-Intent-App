// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import IndexScreen from '../screens/IndexScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="Index"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Index"
                component={IndexScreen}
                options={({ navigation }) => ({
                    title: 'Criminal Intent',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="settings" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail', { crimeId: null })}
                            style={{ marginLeft: 15 }}
                        >
                            <Ionicons name="add" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ navigation }) => ({
                    title: 'Crime Detail',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="settings" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    // No settings icon on Settings screen
                }}
            />
        </Stack.Navigator>
    );
}