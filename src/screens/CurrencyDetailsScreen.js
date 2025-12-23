import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import NavigationUI from "../components/NavigationUI";
import RateCard from "../components/cards/RateCard";
import CountryCard from "../components/cards/CountryCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getCountriesByCurrency } from "../api/countries";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function CurrencyDetails({ parallax }) {

    const route = useRoute();
    const navigation = useNavigation();

    const { currencyCode, baseCurrency } = route.params;

    const currentDate = new Date();

    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const [donnees, setDonnees] = useState([]);
    const [charge, setCharge] = useState(false);
    const [erreur, setErreur] = useState(null);

    const [currencyCountries, setCurrencyCountries] = useState({});

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getCountriesByCurrency().then(setCurrencyCountries);
    }, []);

    async function appliquer() {
        setErreur(null);
        setCharge(true);

        try {
            const liste = [];
            const start = new Date(fromDate);
            const end = new Date(toDate);

            for (
                let date = new Date(start);
                date <= end;
                date.setDate(date.getDate() + 1)
            ) {
                const dateString = formatDate(date);

                const rep = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateString}/v1/currencies/all.json`
                );

                if (!rep.ok) continue;

                const json = await rep.json();
                const taux = json?.all;

                const tauxBrut = taux[currencyCode.toLowerCase()];
                const baseRate = taux[baseCurrency];

                if (typeof tauxBrut === "number" && typeof baseRate === "number") {
                    const converted = tauxBrut / baseRate;

                    liste.push({
                        id: `${dateString}-${currencyCode}`,
                        codeDevise: dateString,
                        taux: converted.toFixed(4),
                    });
                }
            }

            if (liste.length === 0) {
                setErreur("No data available for the selected date range.");
            }

            setDonnees(liste);
        } catch {
            setErreur("Unable to load currency history.");
        }

        setCharge(false);
    }

    return (
        <NavigationUI title={currencyCode} parallax={parallax}>
            <View style={styles.page}>

                <Text style={styles.titre}>Exchange Rates History</Text>

                    
                <TouchableOpacity onPress={() => navigation.navigate("ExchangeRates")}>
                    <Text style={styles.sousTitre}>{`Base currency: ${baseCurrency.toUpperCase()}`}</Text>
                </TouchableOpacity>

                <Text style={styles.sousTitre}>Select a date range to view history.</Text>

                {showFromPicker && (
                    <DateTimePicker
                        value={fromDate}
                        mode="date"
                        display={Platform.OS === "android" ? "default" : "spinner"}
                        maximumDate={toDate}
                        minimumDate={new Date("2024-03-02")}
                        onChange={(e, d) => {
                            setShowFromPicker(false);
                            if (d) setFromDate(d);
                        }}
                    />
                )}

                {showToPicker && (
                    <DateTimePicker
                        value={toDate}
                        mode="date"
                        display={Platform.OS === "android" ? "default" : "spinner"}
                        maximumDate={currentDate}
                        minimumDate={fromDate}
                        onChange={(e, d) => {
                            setShowToPicker(false);
                            if (d) setToDate(d);
                        }}
                    />
                )}

                <View style={styles.controlsRow}>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowFromPicker(true)}>
                        <Ionicons name="calendar-outline" size={18} color="#fff" />
                        <Text style={styles.dateButtonText}>From {formatDate(fromDate)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowToPicker(true)}>
                        <Ionicons name="calendar-outline" size={18} color="#fff" />
                        <Text style={styles.dateButtonText}>To {formatDate(toDate)}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.applyButton} onPress={appliquer}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
                
                {erreur && (
                    <Text style={styles.errorText}>{erreur}</Text>
                )}

                {charge && <ActivityIndicator style={{ marginTop: 20 }} />}

                {!charge && !erreur && (
                        <FlatList
                            data={donnees}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ paddingHorizontal: 12 }}
                            renderItem={({ item }) => (
                                <RateCard code={item.codeDevise} rate={item.taux}/>
                            )}
                        />
             
                )}

                {currencyCountries[currencyCode]?.length > 0 && (
                    <>
                        <Text style={styles.titre}>Countries using {currencyCode}</Text>
                        <FlatList
                            data={currencyCountries[currencyCode]}
                            keyExtractor={(item, i) => item.name + i}
                            contentContainerStyle={{ paddingHorizontal: 12 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("CountryDetails", { name: item.name })}>
                                    <CountryCard name={item.name} region={item.region} flag={item.flag}/>
                                </TouchableOpacity>
                            )}
                        />
                    </>
                )}
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#f6f4f8"
    },
    titre: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 8,
        paddingHorizontal: 12,
        fontSize: 18,
        fontWeight: "600",
        color: "#673AB7"
    },
    sousTitre: {
        textAlign: "center",
        fontSize: 13,
        color: "#666",
        marginVertical: 12
    },
    controlsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginBottom: 10
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#7E57C2"
    },
    dateButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600"
    },
    applyButton: {
        marginHorizontal: 12,
        backgroundColor: "#673AB7",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10
    },
    applyButtonText: {
        color: "#fff",
        fontWeight: "600"
    },
    errorText: {
        color: "#ff3b30",
        textAlign: "center",
        paddingVertical: 12,
        fontSize: 13
    },
});
