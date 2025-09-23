import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CounterScreen from '../screens/CounterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TodayScreen from '../screens/TodayScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {

    const { t } = useTranslation();
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{title: t('Accueil'), headerShown: false}} />
            <Tab.Screen name="Today" component={TodayScreen} options={{title: t('Aujourdhui'), headerShown: false}} />
            <Tab.Screen name="Counter" component={CounterScreen} options={{title: t('Compteur'), headerShown: false}} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{title: t('Parametres'), headerShown: false}} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
                <Stack.Screen name="Details" component={DetailsScreen}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}