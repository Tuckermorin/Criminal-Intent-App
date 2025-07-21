// app/_layout.js - FIXED with working + button
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootLayoutNav() {
    const { theme } = useTheme();
    const router = useRouter();

    const SettingsButton = () => (
        <Pressable
            onPress={() => {
                console.log('Settings button pressed');
                router.push('/settings');
            }}
            style={{ 
                padding: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                marginHorizontal: 4,
                minWidth: 40,
                minHeight: 40,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            testID="settings-button"
        >
            <Ionicons name="settings" size={20} color="#FFFFFF" />
        </Pressable>
    );

    const AddButton = () => (
        <Pressable
            onPress={() => {
                console.log('Add button pressed');
                router.push('/detail');
            }}
            style={{ 
                padding: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                marginHorizontal: 4,
                minWidth: 40,
                minHeight: 40,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            testID="add-crime-button"
        >
            <Ionicons name="add" size={22} color="#FFFFFF" />
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
                    headerRight: () => {
                        const router = useRouter();
                        return (
                            <View style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                marginRight: 10,
                            }}>
                                <Pressable
                                    onPress={() => router.push('/detail')}
                                    style={{ 
                                        padding: 8,
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: 20,
                                        marginHorizontal: 4,
                                        minWidth: 40,
                                        minHeight: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Ionicons name="add" size={22} color="#FFFFFF" />
                                </Pressable>
                                <SettingsButton />
                            </View>
                        );
                    },
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