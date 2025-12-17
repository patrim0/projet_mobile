import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';
import { useContext, useEffect, useState } from "react";

import CountrySearchResults from "../components/CountrySearchResults";
import AllCountriesList from '../screens/AllCountriesList';
import CountryDetails from '../screens/CountryDetails';
import CountrySearchScreen from '../screens/CountrySearchScreen';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { AuthContext } from "../context/AuthContext";
import { getUserInfo } from "../api/auth";
import ExchangeRates from "../screens/ExchangeRates";

const Stack = createNativeStackNavigator();

const parallax = new Animated.Value(0);

export default function AppNavigator() {

    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!token) return;

        async function load() {
            const data = await getUserInfo(token);
            setProfile(data);
        }

        load();
    }, [token]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CountrySearch" children={() => <CountrySearchScreen parallax={parallax} />} />
                <Stack.Screen name="UserAccount" component={AccountScreen} options={{ headerShown: true, title: `${profile?.username}'s Account` }} />
                <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ headerShown: true, title: `${profile?.username}'s Profile` }} />
                <Stack.Screen name="CountryResults" component={CountrySearchResults} />
                <Stack.Screen name="AllCountries" component={AllCountriesList} options={{ headerShown: true, title: "Pays" }}/>
                <Stack.Screen name="CountryDetails" component={CountryDetails} options={{ headerShown: true, title: "Pays" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
