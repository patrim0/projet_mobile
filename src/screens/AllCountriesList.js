import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { findCountries, getAllCountries } from "../api/countries";
import { CompareContext } from "../context/CompareContext";
import CompareFloatingButton from "../components/CompareFloatingButton";

function CountryRow({ item, isSelected, onToggleSelect, onPress, canSelect }) {
    const handleSelectPress = () => {
        if (!isSelected && !canSelect) {
            Alert.alert("Limite atteinte", "Vous pouvez comparer maximum 3 pays.");
            return;
        }
        onToggleSelect();
    };

    return (
        <View style={[styles.ligne, isSelected && styles.ligneSelected]}>
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

            <TouchableOpacity
                onPress={onPress}
                style={styles.ligneContent}
                activeOpacity={0.7}
            >
                <Image source={{ uri: item.flagPng }} style={styles.drapeau} />
                <Text style={styles.nom}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function AllCountriesList() {

    const navigation = useNavigation();

    const { toggleCountry, isSelected, canAddMore } = useContext(CompareContext);

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
        <View style={styles.page}>

            <TextInput
                style={styles.input}
                placeholder="Rechercher un pays"
                value={texte}
                onChangeText={changerTexte}
            />

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
                    />
                )}
            />
            <CompareFloatingButton />
        </View>
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
    }
});

