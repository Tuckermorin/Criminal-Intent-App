// app/_layout.js - Root Layout for Expo Router
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootLayoutNav() {
  const { theme } = useTheme();
  const router = useRouter();

  const SettingsButton = () => (
    <Pressable
      onPress={() => router.push('/settings')}
      style={{ marginRight: 15 }}
      testID="settings-button"
    >
      <Ionicons name="settings" size={20} color="#FFFFFF" />
    </Pressable>
  );

  const AddButton = () => (
    <Pressable
      onPress={() => router.push('/detail')}
      style={{ marginRight: 15 }}
      testID="add-crime-button"
    >
      <Ionicons name="add" size={24} color="#FFFFFF" />
    </Pressable>
  );

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
            <View style={{ flexDirection: 'row' }}>
              <AddButton />
              <SettingsButton />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: 'Crime Detail',
          headerRight: () => <SettingsButton />,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerRight: () => null,
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