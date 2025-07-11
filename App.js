// App.js - Complete Criminal Intent App (No Icons)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRegistry, Text, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import DetailScreen from './src/screens/DetailScreen';
import IndexScreen from './src/screens/IndexScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
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
              testID="settings-button"
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>⚙️</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { crimeId: null })}
              style={{ marginLeft: 15 }}
              testID="add-crime-button"
            >
              <Text style={{ color: '#FFFFFF', fontSize: 18 }}>+</Text>
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
              testID="settings-button-detail"
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>⚙️</Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('main', () => App);
export default App;