import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const homeScreenParallax = new Animated.Value(0);

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" children={() => <HomeScreen homeScreenParallax={homeScreenParallax} />} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
