import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { findCountries, getAllCountries } from "../api/countries";
import CompareFloatingButton from "../components/buttons/CompareFloatingButton";
import CountryCard from "../components/cards/CountryCard";
import NavigationUI from "../components/NavigationUI";
import { CompareContext } from "../context/CompareContext";

function CountryRow({ item, isSelected, onToggleSelect, onPress, canSelect, compareMode }) {

    const handleSelectPress = () => {
        if (!isSelected && !canSelect) {
            Alert.alert("Limite atteinte", "Vous pouvez comparer maximum 3 pays.");
            return;
        }
        onToggleSelect();
    };

    return (
        <TouchableOpacity 
            onPress={compareMode ? handleSelectPress : onPress}
            activeOpacity={0.6}>
            
                {compareMode && (
                    <TouchableOpacity
                        onPress={handleSelectPress}
                        style={styles.checkbox}
                        activeOpacity={0.6}
                    >
                        <Ionicons
                            name={isSelected ? "checkbox" : "square-outline"}
                            size={28}
                            color={isSelected ? "#673AB7" : "#999"}
                        />
                    </TouchableOpacity>
                )}
                <CountryCard name={item.name} region={item.region} flag={item.flagPng} />
        </TouchableOpacity>
    );
}

export default function AllCountriesList({ parallax }) {

    const navigation = useNavigation();

    const [compareMode, setCompareMode] = useState(false);
    const [filterMode, setfilterMode] = useState(false);

    const { toggleCountry, isSelected, canAddMore, clearSelection } = useContext(CompareContext);

    const [texte, setTexte] = useState("");
    const [liste, setListe] = useState([]);

    useEffect(() => {
        charger("");
    }, []);

    const charger = async (valeur) => {
        let data;

        const query = valeur.trim()
        
        if (query.length === 0) {
            data = await getAllCountries();
        }
        else if (query < 2) {
            setListe([]);
            return;
        } 
        else {
            data = await findCountries(query);
            const regex = new RegExp(`^${query}`, "i");
            data = data.filter(c => regex.test(c.name));
        }

        data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        setListe(data);
    };

    const changerTexte = (valeur) => {
        setTexte(valeur);
        charger(valeur);
    };

    const ouvrirPays = (nom) => {
        navigation.navigate("CountryDetails", { name: nom });
    };

    const handleToggleSelect = (item) => {
        toggleCountry(item);
    };

    return (
        <NavigationUI title={"Countries"} parallax={parallax}>
            <View style={styles.page}>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={styles.toggleButtons}
                        onPress={() => setfilterMode(v => !v)}
                    >
                        <Ionicons name="filter" size={18} color={filterMode ? "#fff" : "#673AB7"} />
                        <Text style={[styles.buttonsText, filterMode && { color: "#fff" }]}>Filter</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.toggleButtons}
                        onPress={() => {
                            setCompareMode(v => {
                                if (v) clearSelection();
                                return !v;
                            });
                        }}
                    >
                        <Ionicons name="git-compare" size={18} color={compareMode ? "#fff" : "#673AB7"} />
                        <Text style={[styles.buttonsText, compareMode && { color: "#fff" }]}>Compare</Text>
                    </TouchableOpacity>
                </View>

                {filterMode && (
                    <View style={styles.filterContainer}>

                        <View style={styles.filterBox}>
                            <TextInput
                                style={styles.filterInput}
                                placeholder="Filter by name..."
                                value={texte}
                                onChangeText={changerTexte}
                            />

                            {texte.length > 0 && (
                                <TouchableOpacity onPress={() => changerTexte("")} style={styles.clearButton}>
                                    <MaterialIcons name="cancel" size={20} color="#673AB7" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}

                <FlatList
                    data={liste}
                    contentContainerStyle={{ padding: 12 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <CountryRow
                            item={item}
                            isSelected={isSelected(item.name)}
                            onToggleSelect={() => handleToggleSelect(item)}
                            onPress={() => ouvrirPays(item.name)}
                            canSelect={canAddMore()}
                            compareMode={compareMode}
                        />
                    )}
                />
                <CompareFloatingButton />
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    page: {
         flex: 1,
         backgroundColor: "#f6f4f8" 
    },
    toggleButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#ede7f6",
        minWidth: 110
    },
    buttonsText: {
        fontSize: 14,
        color: "#673AB7",
        fontWeight: "600"
    },
    filterContainer: {
        marginTop: 25,
        paddingHorizontal: 20
    },
    filterLabel: {
        fontSize: 12,
        marginBottom: 6,
        paddingLeft: 10,
        color: '#673AB7'
    },
    filterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#673AB7',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        backgroundColor: '#fff'
    },
    filterInput: {
        flex: 1,
        fontSize: 16
    },
    clearButton: {
        padding: 6
    },
    checkbox: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 25,
        paddingHorizontal: 12
    },
});

