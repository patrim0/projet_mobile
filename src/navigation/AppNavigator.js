import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import CountrySearchResults from "../components/CountrySearchResults";
import CountryDetails from '../screens/CountryDetails';
import SearchScreen from '../screens/CountrySearchScreen';
import Capital from '../screens/Capital';

const Stack = createNativeStackNavigator();

const parallax = new Animated.Value(0);

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CountrySearch" children={() => <SearchScreen parallax={parallax} />} />
                <Stack.Screen name="CountryResults" component={CountrySearchResults}/>
                <Stack.Screen name="CountryDetails" component={CountryDetails} options={{ headerShown: true, title: "Pays" }} />
                <Stack.Screen name="Capital" component={Capital} options={{ headerShown: true, title: "Capitales" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
