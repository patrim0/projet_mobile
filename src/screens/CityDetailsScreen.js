import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NavigationUI from "../components/NavigationUI";
import { getCityWeatherWithForecast } from "../api/weather";
import { getCitiesByCca3 } from "../api/cities";

export default function CityDetails({ parallax }) {

    const route = useRoute();

    const { city, cca3, countryName, flag } = route.params;

    const [selectedCity, setSelectedCity] = useState(city);
    const [cities, setCities] = useState([]);

    const [weather, setWeather] = useState(null);
    const [cityForecasts, setCityForecasts] = useState({});

    const [loading, setLoading] = useState(true);

    const sortedCities = (() => {
        if (!cities || cities.length === 0) return [];
    
        const capitalCity = cities.find(c => c.city === city);
    
        const others = cities
            .filter(c => c.city !== city && typeof c.population === "number")
            .sort((a, b) => b.population - a.population)
            .slice(0, 20);
    
        return capitalCity ? [capitalCity, ...others] : others;
    })();

    async function loadCityForecast(cityName) {
        if (cityForecasts[cityName]) return;

        const data = await getCityWeatherWithForecast({ city: cityName });
        if (!data?.forecast) return;

        setCityForecasts(prev => ({
            ...prev,
            [cityName]: data.forecast.slice(0, 3)
        }));
    }

    useEffect(() => {
        getCitiesByCca3(cca3).then(setCities);
    }, [cca3]);

    useEffect(() => {
        if (!sortedCities.length) return;

        sortedCities.forEach(c => {
            loadCityForecast(c.city);
        });
    }, [sortedCities]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);

            const data = await getCityWeatherWithForecast({city: selectedCity});

            if (!mounted) return;

            if (data) {
                setWeather(data);
            }

            setLoading(false);
        }

        load();
        return () => { mounted = false; };
    }, [selectedCity]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    const { current, forecast } = weather;

    const cityInfo = cities.find(c => c.city === selectedCity);

    return (
        <NavigationUI title={selectedCity} parallax={parallax}>
            <ScrollView contentContainerStyle={styles.page}>

                <View style={[styles.card, { position: "relative" }]}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                        {cityInfo?.admin_division && (
                            <View>
                                <Text style={styles.metricLabel}>Administrative division</Text>
                                <Text style={styles.metricValue}>{cityInfo.admin_division}</Text>
                            </View>
                        )}

                        <Text style={styles.metricValue}>{countryName} {flag}</Text>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        {cityInfo?.population && (
                            <View>
                                <Text style={styles.metricLabel}>Population</Text>
                                <Text style={styles.metricValue}>{cityInfo.population.toLocaleString()}</Text>
                            </View>
                        )}

                        <View style={{ alignItems: "flex-end" }}>
                            <Image
                                source={{ uri: `https://flagcdn.com/w40/${cca3.toLowerCase()}.png` }}
                                style={{ width: 40, height: 28, borderRadius: 4, marginBottom: 2 }}
                            />

                            {cityInfo?.is_capital && (
                                <Text style={{ fontSize: 11, color: "#673AB7", fontWeight: "600" }}>Capital</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Current</Text>

                    <View style={styles.currentRow}>
                        {current.icon && (
                            <Image source={{ uri: current.icon }} style={styles.icon}/>
                        )}
                        <View>
                            <Text style={styles.temp}>{Math.round(current.tempC)}°C</Text>
                            <Text style={styles.condition}>{current.condition}</Text>
                        </View>
                    </View>

                    <View style={styles.metricsGrid}>

                        <View style={styles.metricColumn}>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>Feels like</Text>
                                <Text style={styles.metricValue}>{Math.round(current.feelsLikeC)}°C</Text>
                            </View>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>Rain</Text>
                                <Text style={styles.metricValue}>{current.rainChance != null ? `${current.rainChance}%` : "—"}</Text>
                            </View>
                        </View>


                        <View style={styles.metricColumn}>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>Humidity</Text>
                                <Text style={styles.metricValue}>{current.humidity}%</Text>
                            </View>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>Clouds</Text>
                                <Text style={styles.metricValue}>{current.cloud}%</Text>
                            </View>
                        </View>


                        <View style={styles.metricColumn}>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>Wind</Text>
                                <Text style={styles.metricValue}>{current.windKph} km/h</Text>
                            </View>

                            <View style={styles.metricCell}>
                                <Text style={styles.metricLabel}>UV</Text>
                                <Text style={styles.metricValue}>{current.uv}</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Next 7 days</Text>

                    {forecast.map(day => (
                        <View key={day.date} style={styles.forecastCard}>
                            <View style={styles.forecastCardLeft}>
                                <Text style={styles.forecastDate}>
                                    {new Date(day.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </Text>

                                <Text style={styles.forecastCondition}>{day.condition}</Text>
                            </View>

                            <View style={styles.forecastCardRight}>
                                {day.icon && (
                                    <Image source={{ uri: day.icon }} style={styles.forecastBigIcon}/>
                                )}

                                <Text style={styles.forecastRange}>{Math.round(day.minC)}° / {Math.round(day.maxC)}°</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{`Most Populated Cities in ${countryName}`}</Text>

                    {sortedCities
                        .filter(c => cityForecasts[c.city])
                        .map((c, index) => (
                        <TouchableOpacity
                            key={c._id}
                            activeOpacity={0.6}
                            onPress={() => {
                                setSelectedCity(c.city);
                                loadCityForecast(c.city);
                            }}
                            style={[styles.cityCard, c.city === selectedCity && styles.cityCardSelected]}
                        >

                            <View style={{ flex: 1, paddingRight: 8 }}>
                                <Text style={{fontWeight: c.city === selectedCity ? "700" : "400",
                                        color: c.city === selectedCity ? "#673AB7" : "#444"}}
                                        numberOfLines={1}
                                        ellipsizeMode="tail">
                                    {c.city}
                                </Text>

                                {c.admin_division && (
                                    <Text style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{c.admin_division}</Text>
                                )}

                                {c.population && (
                                    <Text style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>{c.population.toLocaleString()}</Text>
                                )}
                            </View>


                            <View style={styles.forecastPreview}>
                                {cityForecasts[c.city]?.map(day => (
                                    <View key={day.date} style={styles.forecastDay}>
                                        <Text style={styles.forecastLabel}>
                                            {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                                        </Text>

                                        {day.icon && (
                                            <Image source={{ uri: day.icon }} style={styles.forecastIcon}/>
                                        )}

                                        <Text style={styles.forecastTemp}>{Math.round(day.minC)}°/{Math.round(day.maxC)}°</Text>
                                    </View>
                                ))}
                            </View>
                            
                        </TouchableOpacity>
                        
                    ))}
                    
                </View>

            </ScrollView>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    page: {
        padding: 16,
        backgroundColor: "#f6f4f8"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    sectionTitle: {
        fontSize: 12,
        color: "#673AB7",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 8
    },
    currentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    icon: {
        width: 64,
        height: 64,
        marginRight: 12
    },
    temp: {
        fontSize: 32,
        fontWeight: "700",
        color: "#673AB7"
    },
    condition: {
        fontSize: 14,
        color: "#666"
    },
    metricsGrid: {
        flexDirection: "row",
        marginTop: 10
    },
    metricColumn: {
        flex: 1,
        alignItems: "center"
    },
    forecastPreview: {
        flexDirection: "row",
        width: 150,
        justifyContent: "space-between"
    },
    forecastDay: {
        alignItems: "center",
        width: 46
    },
    forecastLabel: {
        fontSize: 10,
        color: "#999",
        marginBottom: 2
    },
    forecastIcon: {
        width: 22,
        height: 22,
        marginVertical: 2
    },
    forecastTemp: {
        fontSize: 10,
        color: "#666"
    },
    cityCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e6e3e3ff",
        marginBottom: 8
    },
    cityCardSelected: {
        borderColor: "#673AB7",
        backgroundColor: "#f4f0fb"
    },
    forecastCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e6e3e3ff",
        marginTop: 8
    },
    forecastCardLeft: {
        flex: 1,
        paddingRight: 10
    },
    forecastCardRight: {
        alignItems: "center"
    },
    forecastDate: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444"
    },
    forecastCondition: {
        fontSize: 12,
        color: "#777",
        marginTop: 2
    },
    forecastBigIcon: {
        width: 36,
        height: 36,
        marginBottom: 2
    },
    forecastRange: {
        fontSize: 12,
        fontWeight: "600",
        color: "#673AB7"
    },
    metricCell: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e6e3e3ff",
        borderRadius: 6,
        backgroundColor: "#fafafa"
    },
    metricValue: {
        color: "#673AB7"
    },
    metricLabel: {
        color: "#666"
    }
});