import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CounterScreen from '../screens/CounterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TodayScreen from '../screens/TodayScreen';
import { FontSizeContext } from '../context/FontSizeContext';  // Import du contexte

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const { fontSize } = useContext(FontSizeContext);  // Récupération du fontSize

    return (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: fontSize }  
          }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
            <Tab.Screen name="Today" component={TodayScreen} options={{ title: "Aujourd'hui" }} />
            <Tab.Screen name="Counter" component={CounterScreen} options={{ title: 'Compteur' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
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
