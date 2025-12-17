import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { findCountries, getAllCountries } from "../api/countries";

export default function AllCountriesList() {

    const navigation = useNavigation();

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
                    <Pressable style={styles.ligne} onPress={() => ouvrirPays(item.name)}>
                        <Image source={{ uri: item.flagPng }} style={styles.drapeau} />
                        <Text style={styles.nom}>{item.name}</Text>
                    </Pressable>
                )}
            />

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

