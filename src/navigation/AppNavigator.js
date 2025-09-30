import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTextColor } from '../context/ColorContext';
import CounterScreen from '../screens/CounterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TodayScreen from '../screens/TodayScreen';
import Feather from '@expo/vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {

    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { textColor } = useTextColor();
    
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: theme === 'dark' ? styles.dark : styles.light, tabBarActiveTintColor: textColor, headerTintColor: textColor}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{title: t('Accueil'), headerShown: false}} />
            <Tab.Screen name="Today" component={TodayScreen} options={{title: t('Aujourdhui'), headerShown: false}} />
            <Tab.Screen name="Counter" component={CounterScreen} options={{title: t('Compteur'), headerShown: false}} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{title: t('Parametres'), headerShown: false}} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Counter" component={CounterScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Today" component={TodayScreen} options={{ title: "Aujourd'hui" }} />  
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    value: { 
        fontSize: 22, 
        marginBottom: 16 
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    light: { 
        backgroundColor: '#ffffff', 
        color: '#111111' 
    },
    dark: { 
        backgroundColor: '#111111', 
        color: '#ffffff' 
    }
});