import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Platform, TextInput } from "react-native";
import NavigationUI from "../components/NavigationUI";
import RateCard from "../components/cards/RateCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getCountriesByCurrency } from "../api/countries";
import { useNavigation } from "@react-navigation/native";

export default function ExchangeRates({ parallax }) {

    const navigation = useNavigation();

    const [donnees, setDonnees] = useState([]);
    const [charge, setCharge] = useState(true);
    const [erreur, setErreur] = useState(null);

    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showPicker, setShowPicker] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [searchMode, setSearchMode] = useState("code");
    const [currencyCountries, setCurrencyCountries] = useState({});

    const [baseCurrency, setBaseCurrency] = useState("usd");
    const [selectBaseMode, setSelectBaseMode] = useState(false);

    function formatDate(date) {
        return date.toISOString().split("T")[0];
    }

    useEffect(() => {
        const charger = async () => {
            setErreur(null);
            try {
                const dateString = formatDate(selectedDate);

                const repTaux = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateString}/v1/currencies/all.json`
                );
                const dataTaux = await repTaux.json();

                let rates = {};
                if (dataTaux && dataTaux.all) {
                    rates = dataTaux.all;
                }

                const liste = [];

                const codesMinuscules = Object.keys(rates);

                for (let i = 0; i < codesMinuscules.length; i++) {
                    const codeMin = codesMinuscules[i];

                    const codeMaj = codeMin.toUpperCase();
                    const tauxBrut = rates[codeMin];
                    const baseRate = rates[baseCurrency];

                    let valeurAffichee = "- - -";

                    if (typeof tauxBrut === "number" && typeof baseRate === "number") {
                        const converted = tauxBrut / baseRate;
                        valeurAffichee = converted.toFixed(3);
                    }

                    liste.push({
                        id: codeMaj,
                        codeDevise: codeMaj,
                        taux: valeurAffichee,
                    });
                }


                liste.sort(function (a, b) {
                    return a.codeDevise.localeCompare(b.codeDevise);
                });

                setDonnees(liste);
            } catch (e) {
                setErreur(`Unable to load rates for ${selectedDate.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}. \nPlease select another date or try again.`);
            }
            setCharge(false);
        };

        charger();
    }, [selectedDate, baseCurrency]);

    useEffect(() => {
        getCountriesByCurrency().then(setCurrencyCountries);
    }, []);

    const visibleResults =
        searchMode === "country"
            ? donnees.filter(item => currencyCountries[item.codeDevise]?.length > 0)
            : donnees;
    
    const searchResults = visibleResults.filter(item => {
        const query = searchText.trim();
        if (query.length === 0) return true;

        const regex = new RegExp(`^${query}`, "i");

        if (searchMode === "code") {
            return regex.test(item.codeDevise);
        }

        const countries = currencyCountries[item.codeDevise] || [];
        return countries.some(c => regex.test(c.name));
    });
    
    if (charge) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationUI title="Exchange Rates" parallax={parallax}>
            <View style={styles.page}>



                {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === "android" ? "default" : "spinner"}
                        maximumDate={currentDate}
                        minimumDate={new Date("2024-03-02")}
                        onChange={(event, date) => {
                            setShowPicker(false);
                            if (date) setSelectedDate(date);
                        }}
                    />
                )}

                
                <View style={{ paddingHorizontal: 12, marginBottom: 10 }}>
                    <View style={styles.buttonsRow}>
                        
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TouchableOpacity 
                                style={[styles.buttons, searchMode === "code" && { backgroundColor: "#673AB7" }]}
                                onPress={() => setSearchMode("code")}
                            >
                                <Text style={[styles.buttonsText, searchMode === "code" && { color: "#fff" }]}>
                                    Code
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttons, searchMode === "country" && { backgroundColor: "#673AB7" }]}
                                onPress={() => setSearchMode("country")}
                            >

                                <Text style={[styles.buttonsText, searchMode === "country" && { color: "#fff" }]}>
                                    Country
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton} activeOpacity={0.7}>
                            <Ionicons name="calendar-outline" size={18} color="#fff" />
                            <Text style={styles.dateButtonText}>Change date</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={
                                searchMode === "code"
                                    ? "Search by currency code..."
                                    : "Search by country name..."
                            }
                            value={searchText}
                            onChangeText={setSearchText}
                            autoCapitalize="none"
                        />

                        {searchText.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchText("")}
                                style={{padding: 6}}
                            >
                                <MaterialIcons
                                    name="cancel"
                                    size={20}
                                    color="#673AB7"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>                

                {erreur && (
                    <Text
                        style={{
                            color: "#ff3b30",
                            textAlign: "center",
                            paddingVertical: 12,
                            fontSize: 13
                        }}
                    >
                        {erreur}
                    </Text>
                )}

                {!erreur && (
                    <View>
                        <Text style={styles.titre}>
                            {formatDate(selectedDate) === formatDate(currentDate)
                            ? "Today's Rates"
                            : `Rates for ${selectedDate.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}`}
                        </Text>

                        <View style={styles.baseRow}>
                            <Text style={styles.sousTitre}>Base currency:</Text>

                            <TouchableOpacity
                                onPress={() => setSelectBaseMode(v => !v)}
                                style={[
                                    styles.basePill,
                                    selectBaseMode && styles.basePillActive
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.basePillText, selectBaseMode && { color: "#fff" }]}>
                                    {selectBaseMode ? "SELECT" : baseCurrency.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={searchResults}
                            keyExtractor={function (item) {
                                return item.id;
                            }}
                            contentContainerStyle={{ paddingHorizontal: 12 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={selectBaseMode ? 0.6 : 1}
                                    onPress={() => {
                                        if (selectBaseMode) {
                                            setBaseCurrency(item.codeDevise.toLowerCase());
                                            setSearchText("");
                                            setSelectBaseMode(false);
                                            return;
                                        }

                                        navigation.navigate("CurrencyDetails", {currencyCode: item.codeDevise, baseCurrency});
                                    }}
                                >
                                    <RateCard code={item.codeDevise} rate={item.taux}/>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    )}
            </View>
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
        flex: 1,
        backgroundColor: "#f6f4f8"
    },
    titre: {
        fontSize: 18,
        fontWeight: "700",
        paddingVertical: 12,
        textAlign: "center",
        color: "#673AB7"
    },
    sousTitre: {
        fontSize: 12,
        color: "#646464ff",
        paddingHorizontal: 6,
        paddingVertical: 12,
        textAlign: "right"
    },
    code: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        letterSpacing: 0.5
    },
    deviseBox: {
        width: 120,
        backgroundColor: "#f0ebfa",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    valeur: {
        fontSize: 14,
        fontWeight: "700",
        color: "#673AB7",
        fontFamily: "Menlo"
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingTop: 40
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#ede7f6",
        minWidth: 75
    },
    buttonsText: {
        fontSize: 14,
        color: "#673AB7",
        fontWeight: "600"
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#673AB7",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        backgroundColor: "#fff"
    },
    searchInput: {
        flex: 1,
        fontSize: 16
    },
    dateButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600"
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 14,
        height: 36,
        alignSelf: "center",
        borderRadius: 18,
        backgroundColor: "#7E57C2"
    },
    baseRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 14,
        marginBottom: 8
    },
    basePill: {
        backgroundColor: "#ede7f6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#673AB7"
    },
    basePillActive: {
        backgroundColor: "#673AB7",
    },
    basePillText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#673AB7"
    },
});