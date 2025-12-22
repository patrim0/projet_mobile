import { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Image } from "react-native";
import AnimationFlag from "../components/AnimationFlag";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from "../context/AuthContext";
import { editUserInfo, getUserInfo } from "../api/auth";
import { getDetails } from "../api/countries";
import { getCurrentUsdBase } from "../api/rates";
import { getTodayCapitalWeather } from "../api/weather";

export default function CountryDetails() {
    const route = useRoute();
    const nom = route.params?.name;
    const [pays, setPays] = useState(null);
    const [charge, setCharge] = useState(true);

    const [profile, setProfile] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { token, setToken } = useContext(AuthContext);

    const [usdBase, setUsdBase] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setCharge(true);
            const data = await getDetails(nom);
            if (mounted) {
                setPays(data);
                setCharge(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [nom]);

    useEffect(() => {
        if (!pays?.currencies) return;

        async function loadUsdBase() {
            const data = await getCurrentUsdBase();
            setUsdBase(data);
        }
        loadUsdBase();
    }, [pays]);

    useEffect(() => {
        if (!pays?.capital) return;

        const latlng = pays.capitalInfo?.latlng;

        setWeatherLoading(true);

        getTodayCapitalWeather({
            capital: pays.capital[0],
            lat: latlng?.[0],
            lon: latlng?.[1]
        })
        .then(setWeather)
        .finally(() => setWeatherLoading(false));;
    }, [pays]);

    useEffect(() => {
        if (!token) return;

        async function loadProfile() {
            const data = await getUserInfo(token);
            setProfile(data);

            if (!data.favoriteCountries) return;

            if (data.favoriteCountries.includes(pays.name.common)) {
                setIsFavorite(true);
            }
        }

        loadProfile();
    }, [token, pays]);

    async function toggleFavorite() {
        if (!token) {
            Alert.alert(
                "Oops!",
                "You must be logged in to add a favorite"
            );
            return;
        }

        const country = pays.name.common;
        const favorites = profile.favoriteCountries || [];

        const updatedFavorites = favorites.includes(country)
            ? favorites.filter(c => c !== country)
            : [...favorites, country];

        const { success, user, token: newToken } = await editUserInfo(token, {
            favoriteCountries: updatedFavorites
        });

        if (!success) return;

        setProfile(user);
        setToken(newToken);
        setIsFavorite(!isFavorite);
    }

    if (charge) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    if (!pays) {
        return (
            <View style={styles.center}>
                <Text>Aucune information trouvée.</Text>
            </View>
        );
    }

    let nativeNames = [];

    if (pays.name.nativeName) {
        const codes = Object.keys(pays.name.nativeName);

        nativeNames = codes.map((code) => {
            const info = pays.name.nativeName[code];
            const nom = info && info.official ? info.official : 'Inconnu';

            if (nom === pays.name.common) return null;

            return { nom, code };
        })
        .filter(Boolean);
    }

    let devises = [];

    if (pays.currencies) {
        const codes = Object.keys(pays.currencies);

        devises = codes.map((code) => {
            const info = pays.currencies[code];

            return { code,
                name: info.name || "Inconnue",
                symbol: info.symbol || ""
            };
        });
    }

    let continents = '';

    if (pays.continents) {
        continents = pays.continents.join(', ')
    }

    let languages = [];

    if (pays.languages) {
        const codes = Object.keys(pays.languages);

        languages = codes.map((code) => 
            pays.languages[code]
        )
        .join(', ');
    }

    let timezones = [];

    if (pays.timezones) {
        const codes = Object.keys(pays.timezones);

        timezones = codes.map((code) => 
            pays.timezones[code]
        )
        .join(', ');
    }    

    return (
        <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
            <AnimationFlag uri={pays.flags.png} />
            <Text style={styles.nom}>{pays.name.common}</Text>

            {nativeNames.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Text>{item.nom}</Text>

                {nativeNames.length > 1 && (
                    <Text style={{ color: '#a3a3a3ff', fontSize: 9, marginLeft: 6, letterSpacing: 0.5 }}>{item.code.toUpperCase()}</Text>
                )}
            </View>
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(pays.maps.googleMaps)}>
                    <MaterialIcons name="map" size={18} color="#ffffff" />
                    <Text style={styles.buttonText}>Show on Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
                    <MaterialIcons name={isFavorite ? "favorite" : "favorite-border"} size={18} color="#ffffff" />
                    <Text style={styles.buttonText}>{isFavorite ? "In Favorites" : "Add to Favorites"}</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
                <View style={styles.card}>
                    <Text style={styles.label}>Currencies</Text>
                    {devises.map((devise, index) => {
                        const rate = usdBase?.[devise.code.toLowerCase()];

                        return (
                            <View key={index} style={{ marginTop: 6 }}>
                                <Text style={styles.valueLabel}>{devise.name}</Text>

                                <Text style={styles.value}>{devise.code} ({devise.symbol})</Text>

                                <Text style={styles.valueRate}>{rate ? `Today: 1 ${devise.code} = ${(1/rate).toFixed(3)} USD` : "Rate unavailable"}</Text>
                                {index < devises.length - 1 && (
                                    <View style={styles.separator}/>
                                )}
                            </View>
                        );
                    })}
              
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Geography</Text>

                    <Text style={styles.valueLabel}>Capital</Text>
                    <Text style={styles.value}>{pays.capital}</Text>

                    {weatherLoading && (
                        <ActivityIndicator size="small" style={{ marginTop: 6 }} />
                    )}
                    {!weatherLoading && weather && (
                        <View style={{ flexDirection: "row", alignItems: "center"}}>
                            <Text style={[styles.valueRate]}>Currently: {weather.tempC.toFixed(1)}°C · {weather.condition}</Text>
                            <Image source={{ uri: weather.icon }} style={{ width: 30, height: 30}}/>
                        </View>
                    )}
                    <View style={styles.separator}/>

                    <Text style={styles.valueLabel}>Continent</Text>
                    <Text style={styles.value}>{continents}</Text>
                    <View style={styles.separator}/>

                    <Text style={styles.valueLabel}>Area</Text>
                    <Text style={styles.value}>{pays.area.toLocaleString()} km²</Text>
                    <View style={styles.separator}/>

                    <Text style={styles.valueLabel}>Timezones</Text>
                    <Text style={styles.value}>{timezones}</Text>

                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Demography</Text>

                    <Text style={styles.valueLabel}>Demonym</Text>
                    <Text style={styles.value}>{pays.demonyms.eng.m}</Text>
                    <View style={styles.separator}/>

                    <Text style={styles.valueLabel}>Population</Text>
                    <Text style={styles.value}>{pays.population.toLocaleString()}</Text>
                    <View style={styles.separator}/>

                    <Text style={styles.valueLabel}>Languages</Text>
                    <Text style={styles.value}>{languages}</Text>

                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    page: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F5EEF9"
    },
    drapeau: {
        width: 250,
        height: 150,
        resizeMode: "contain",
        borderRadius: 12,
        backgroundColor: "#eee",
        alignSelf: "center",
        marginTop: 20
    },
    nom: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: "600",
        color: "#673AB7",
        textAlign: "center"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    label: {
        fontSize: 12,
        color: "#673AB7",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.5
    },
    value: {
        fontSize: 15,
        color: "#272727ff",
        marginTop: 4
    },
    valueLabel: {
        fontSize: 13,
        color: "#646464ff",
        marginTop: 6
    },
    valueRate: {
        fontSize: 11,
        color: "#a1a1a1ff",
        marginTop: 6
    },
    separator: {
        height: 1, 
        backgroundColor: "#e6e3e3ff", 
        marginVertical: 8
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#673AB7",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        width: '45%'
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 15,
        marginLeft: 8
    }
});
