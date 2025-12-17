import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AnimationFlag from "../components/AnimationFlag";

export default function CountryDetails() {
    const route = useRoute();
    const nom = route.params?.name;
    const [pays, setPays] = useState(null);
    const [charge, setCharge] = useState(true);

    useEffect(() => {
        const chercher = async () => {
            try {
                const url = "https://restcountries.com/v3.1/name/" + nom + "?fullText=true";
                const rep = await fetch(url);
                const info = await rep.json();
                setPays(info[0]);
            } catch (e) {
                setPays(null);
            }
            setCharge(false);
        };

        chercher();
    }, [nom]);

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

    let devises = '';

    if (pays.currencies) {
        const codes = Object.keys(pays.currencies);

        devises = codes
            .map((code) => {
                const info = pays.currencies[code];
                const nom = info && info.name ? info.name : "Inconnue";
                const symbole = info && info.symbol ? " (" + info.symbol + ")" : "";
                return code + " - " + nom + symbole;
            })
            .join(", ");
    }

    let continents = '';

    if (pays.continents) {
        continents = pays.continents.join(', ')
    }

    return (
        <View style={styles.page}>
            <AnimationFlag uri={pays.flags.png} />
            <Text style={styles.nom}>{pays.name.common}</Text>

            {nativeNames.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <Text>{item.nom}</Text>

                {nativeNames.length > 1 && (
                    <Text style={{ color: '#a3a3a3ff', fontSize: 9, marginLeft: 6, letterSpacing: 0.5 }}>
                        {item.code.toUpperCase()}
                    </Text>
                )}
            </View>
            ))}

            <View style={{marginTop: 20}}>
                <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Devise(s) : {devises}
                </Text>

                <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Continent: {continents}
                </Text>

                <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Capital: {pays.capital}
                </Text>

                <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Population: {pays.population.toLocaleString()}
                </Text>

                <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Area: {pays.area.toLocaleString('en')} km²
                </Text>

            </View>

        </View>
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
        padding: 20,
        alignItems: "center"
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
        fontWeight: "600"
    }
});
