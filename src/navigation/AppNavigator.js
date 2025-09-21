import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import { useTextColor } from '../context/ColorContext';
import { FontSizeContext } from '../context/FontSizeContext';
import CounterScreen from '../screens/CounterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TodayScreen from '../screens/TodayScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const { fontSize } = useContext(FontSizeContext);  
    const { textColor } = useTextColor();

    return (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: fontSize },
            tabBarActiveTintColor: textColor,
            headerTintColor: textColor,  
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
