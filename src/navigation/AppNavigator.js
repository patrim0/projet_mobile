import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountryList from "../screens/CountryList";

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" component={HomeScreen} />
                <Stack.Screen name="Countries" component={CountryList} options={{ headerShown: true, title: 'Countries' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
