import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';
import { useContext, useEffect, useState } from "react";

import CountrySearchResults from "../components/CountrySearchResults";
import CountriesScreen from '../screens/CountriesScreen';
import CountryDetailsScreen from '../screens/CountryDetailsScreen';

import CountrySearchScreen from '../screens/CountrySearchScreen';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompareScreen from '../screens/CompareScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import { AuthContext } from "../context/AuthContext";
import { CompareProvider } from '../context/CompareContext';
import { getUserInfo } from "../api/auth";
import ExchangeRatesScreen from "../screens/ExchangeRatesScreen";
import CurrencyDetailsScreen from '../screens/CurrencyDetailsScreen';
import CityDetailsScreen from '../screens/CityDetailsScreen';

import CapitalsWeatherScreen from '../screens/CapitalsWeatherScreen';

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
                <Stack.Screen name="CountrySearchScreen" children={() => <CountrySearchScreen parallax={parallax} />} />
                <Stack.Screen name="UserAccountScreen" children={() => <AccountScreen parallax={parallax} />} />
                <Stack.Screen name="UserProfileScreen" children={() => <ProfileScreen parallax={parallax} />} />
                <Stack.Screen name="CountryResults" component={CountrySearchResults} />
                <Stack.Screen name="CountriesScreen" children={() => <CountriesScreen parallax={parallax} />}/>
                <Stack.Screen name="CountryDetailsScreen" children={() => <CountryDetailsScreen parallax={parallax} />} />
                <Stack.Screen name="ExchangeRatesScreen" children={() => <ExchangeRatesScreen parallax={parallax} />}/>
                <Stack.Screen name="CapitalsWeatherScreen" children={() => <CapitalsWeatherScreen parallax={parallax}/>}/>
                <Stack.Screen name="FavoritesScreen" children={() => <FavoritesScreen parallax={parallax}/>} />
                <Stack.Screen name="CompareCountries" children={() => <CompareScreen parallax={parallax}/>} />
                <Stack.Screen name="CurrencyDetailsScreen" children={() => <CurrencyDetailsScreen parallax={parallax}/>} />
                <Stack.Screen name="CityDetailsScreen" children={() => <CityDetailsScreen parallax={parallax}/> } />
                </Stack.Navigator>
            </NavigationContainer>
        </CompareProvider>
    );
}
