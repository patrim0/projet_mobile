import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { findCountries, getAllCountries } from "../api/countries";
import { AuthContext } from "../context/AuthContext";
import { getUserInfo } from "../api/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { removeFavorite } from "../api/auth";
import NavigationUI from "../components/NavigationUI";

export default function Favorites({ parallax }) {

    const navigation = useNavigation();

    const { token } = useContext(AuthContext);
    
    const [profile, setProfile] = useState(null);
    const [liste, setListe] = useState([]);

    useEffect(() => {
        if (!token) return;

        async function load() {
            const data = await getUserInfo(token);
            setProfile(data);
        }

        load();
    }, [token]);

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

    const ouvrirPays = (nom) => {
        navigation.navigate("CountryDetails", { name: nom });
    };

    async function handleRemoveFavorite(countryName) {
        const { success, user, token: newToken } =
            await removeFavorite(token, profile.favoriteCountries, countryName);

        if (!success) return;

        setProfile(user);
        setToken(newToken);
    }

    return (
        <NavigationUI title={`${profile?.username}'s Favorites`} parallax={parallax}>
            <View style={styles.page}>
                <FlatList
                    data={liste.filter(item => profile?.favoriteCountries.includes(item.name))}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ padding: 12 }}
                    renderItem={({ item }) => (

                        <View style={styles.ligne}>
                            <Pressable style={styles.countryText} onPress={() => ouvrirPays(item.name)}>
                                <Image source={{ uri: item.flagPng }} style={styles.drapeau} />
                                <Text style={styles.nom}>{item.name}</Text>
                            </Pressable>

                            <TouchableOpacity onPress={() => handleRemoveFavorite(item.name)}>
                                <MaterialIcons name="cancel" size={20} color="#673AB7" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#f6f4f8",
        paddingVertical: 25
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
        marginBottom: 8,
        justifyContent: "space-between",
        elevation: 2
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
    countryText: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 10,
    },
});

