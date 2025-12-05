import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import CountryList from "../components/CountrySearchResults";
import CountryDetails from '../screens/CountryDetails';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const parallax = new Animated.Value(0);

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Search" children={() => <SearchScreen parallax={parallax} />} />
                <Stack.Screen name="Countries" component={CountryList} options={{ headerShown: true, title: 'Countries' }}/>
                <Stack.Screen name="CountryDetails" component={CountryDetails} options={{ headerShown: true, title: "Pays" }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
