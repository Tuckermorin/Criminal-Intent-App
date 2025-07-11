// app/_layout.js - Root Layout for Expo Router
import { Stack } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <Stack
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
        name="index"
        options={{
          title: 'Criminal Intent',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              testID="settings-button"
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>⚙️</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: 'Crime Detail',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}