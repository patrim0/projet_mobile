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
import CompareScreen from '../screens/CompareScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import { AuthContext } from "../context/AuthContext";
import { CompareProvider } from '../context/CompareContext';
import { getUserInfo } from "../api/auth";
import ExchangeRates from "../screens/ExchangeRates";

import CapitalsWeather from '../screens/CapitalsWeather';

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

/*         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CountrySearch" children={() => <CountrySearchScreen parallax={parallax} />} />
                <Stack.Screen name="UserAccount" component={AccountScreen} options={{ headerShown: true, title: `${profile?.username}'s Account` }} />
                <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ headerShown: true, title: `${profile?.username}'s Profile` }} />
                <Stack.Screen name="CountryResults" component={CountrySearchResults} />
                <Stack.Screen name="AllCountries" component={AllCountriesList} options={{ headerShown: true, title: "Pays" }}/>
                <Stack.Screen name="CountryDetails" component={CountryDetails} options={{ headerShown: true, title: "Pays" }} />
                <Stack.Screen name="ExchangeRates" component={ExchangeRates} options={{ headerShown: true, title: "Exchange Rates" }}/>
                <Stack.Screen name="CapitalsWeather" component={CapitalsWeather} options={{ headerShown: true, title: "Météo des capitales" }}/>
                <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: true, title: "Favorites" }} />
            </Stack.Navigator>
        </NavigationContainer> */

        /* Pas une bonne idée de tout wrap dans un provider... à fix */
        <CompareProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CountrySearch" children={() => <CountrySearchScreen parallax={parallax} />} />
                <Stack.Screen name="UserAccount" children={() => <AccountScreen parallax={parallax} />} />
                <Stack.Screen name="UserProfile" children={() => <ProfileScreen parallax={parallax} />} />
                <Stack.Screen name="CountryResults" component={CountrySearchResults} />
                <Stack.Screen name="AllCountries" children={() => <AllCountriesList parallax={parallax} />}/>
                <Stack.Screen name="CountryDetails" children={() => <CountryDetails parallax={parallax} />} />
                <Stack.Screen name="ExchangeRates" children={() => <ExchangeRates parallax={parallax} />}/>
                <Stack.Screen name="CapitalsWeather" children={() => <CapitalsWeather parallax={parallax}/>}/>
                <Stack.Screen name="Favorites" children={() => <FavoritesScreen parallax={parallax}/>} />
                <Stack.Screen name="CompareCountries" children={() => <CompareScreen parallax={parallax}/>} />
                </Stack.Navigator>
            </NavigationContainer>
        </CompareProvider>
    );
}
