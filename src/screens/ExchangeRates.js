import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet,
} from "react-native";
import NavigationUI from "../components/NavigationUI";
import RateCard from "../components/cards/RateCard";

export default function ExchangeRates({ parallax }) {
    const [donnees, setDonnees] = useState([]);
    const [charge, setCharge] = useState(true);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        const charger = async () => {
            try {

                const repTaux = await fetch(
                    "https://latest.currency-api.pages.dev/v1/currencies/usd.json"
                );
                const dataTaux = await repTaux.json();

                let rates = {};
                if (dataTaux && dataTaux.usd) {
                    rates = dataTaux.usd;
                }

                const liste = [];

                const codesMinuscules = Object.keys(rates);
                for (let i = 0; i < codesMinuscules.length; i++) {
                    const codeMin = codesMinuscules[i];


                    if (codeMin === "usd") continue;

                    const codeMaj = codeMin.toUpperCase();
                    const tauxBrut = rates[codeMin];

                    let valeurAffichee = "- - -";
                    if (typeof tauxBrut === "number") {
                        valeurAffichee = tauxBrut.toFixed(3);
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
                setErreur("Impossible de charger la liste des devises.");
            }
            setCharge(false);
        };

        charger();
    }, []);

    if (charge) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    if (erreur) {
        return (
            <View style={styles.center}>
                <Text>{erreur}</Text>
            </View>
        );
    }

    return (
        <NavigationUI title="Exchange Rates" parallax={parallax}>
            <View style={styles.page}>
                <Text style={styles.titre}>Taux de change à jour</Text>
                <Text style={styles.sousTitre}>Base currency: USD</Text>

                <FlatList
                    data={donnees}
                    keyExtractor={function (item) {
                        return item.id;
                    }}
                    contentContainerStyle={{ padding: 12 }}
                    renderItem={({ item }) => (
                        <RateCard code={item.codeDevise} rate={item.taux} />
                    )}
                />
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
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
        color: "#673AB7"
    },
    sousTitre: {
        fontSize: 12,
        color: "#673AB7",
        marginBottom: 8,
        paddingHorizontal: 14,
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
});