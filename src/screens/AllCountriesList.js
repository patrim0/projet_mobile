import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { findCountries, getAllCountries } from "../api/countries";
import { CompareContext } from "../context/CompareContext";
import CompareFloatingButton from "../components/CompareFloatingButton";
import NavigationUI from "../components/NavigationUI";

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
            style={[styles.ligne, isSelected && styles.ligneSelected]} 
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

            <View style={styles.ligneContent}>
                <Image source={{ uri: item.flagPng }} style={styles.drapeau} />
                <Text style={styles.nom}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function AllCountriesList({ parallax }) {

    const navigation = useNavigation();

    const [compareMode, setCompareMode] = useState(false);
    const { toggleCountry, isSelected, canAddMore, clearSelection } = useContext(CompareContext);

    const [texte, setTexte] = useState("");
    const [liste, setListe] = useState([]);

    useEffect(() => {
        charger("");
    }, []);

    const charger = async (valeur) => {
        let data;

        if (valeur.trim().length === 0) {
            data = await getAllCountries();
        } else {
            data = await findCountries(valeur);
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

                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un pays"
                    value={texte}
                    onChangeText={changerTexte}
                />

                <TouchableOpacity
                    style={styles.compareToggle}
                    onPress={() => {
                        setCompareMode(v => {
                            if (v) clearSelection();
                            return !v;
                        });
                    }}
                >
                    <Ionicons name="git-compare" size={18} color={compareMode ? "#fff" : "#673AB7"} />
                    <Text style={[styles.compareToggleText, compareMode && { color: "#fff" }]}>Comparer</Text>
                </TouchableOpacity>

                <FlatList
                    data={liste}
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
        backgroundColor: "#f6f4f8",
        padding: 12
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        fontSize: 16
    },
    ligne: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 8
    },
    drapeau: {
        width: 50,
        height: 32,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: "#eee"
    },
    nom: {
        fontSize: 16,
        fontWeight: "500"
    },
    compareToggle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        alignSelf: "flex-end",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#ede7f6",
        marginBottom: 8,
    },
        compareToggleText: {
        fontSize: 14,
        color: "#673AB7",
        fontWeight: "600",
    },
});

