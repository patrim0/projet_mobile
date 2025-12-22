import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Image,
} from "react-native";
import NavigationUI from "../components/NavigationUI";

const WEATHER_API_KEY = "24923ddba8b949cb902144825252012";

export default function CapitalsWeather({ parallax }) {
    const [donnees, setDonnees] = useState([]);
    const [enChargement, setEnChargement] = useState(true);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        async function chargerDonnees() {
            try {

                const repPays = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name,capital,capitalInfo,flags"
                );
                const paysJson = await repPays.json();

                const listeTemp = [];


                for (let i = 0; i < paysJson.length; i++) {
                    const pays = paysJson[i];


                    let capitale = "Inconnue";
                    if (pays.capital && pays.capital.length > 0) {
                        capitale = pays.capital[0];
                    }

                    let nomPays = "";
                    if (pays.name && pays.name.common) {
                        nomPays = pays.name.common;
                    }

                    let drapeau = "";
                    if (pays.flags && pays.flags.png) {
                        drapeau = pays.flags.png;
                    }


                    let latitudeCapitale = null;
                    let longitudeCapitale = null;
                    if (
                        pays.capitalInfo &&
                        pays.capitalInfo.latlng &&
                        pays.capitalInfo.latlng.length === 2
                    ) {
                        latitudeCapitale = pays.capitalInfo.latlng[0];
                        longitudeCapitale = pays.capitalInfo.latlng[1];
                    }


                    let temperatureTexte = "?";
                    let icone = "";

                    if (capitale !== "Inconnue") {
                        try {

                            let texteRechercheMeteo = capitale;
                            if (
                                latitudeCapitale !== null &&
                                longitudeCapitale !== null
                            ) {
                                texteRechercheMeteo =
                                    latitudeCapitale + "," + longitudeCapitale;
                            }

                            const urlMeteo =
                                "https://api.weatherapi.com/v1/current.json" +
                                "?key=" +
                                WEATHER_API_KEY +
                                "&q=" +
                                encodeURIComponent(texteRechercheMeteo) +
                                "&aqi=no";

                            const repMeteo = await fetch(urlMeteo);
                            const meteoJson = await repMeteo.json();


                            let tempC = null;
                            if (meteoJson && meteoJson.current) {
                                tempC = meteoJson.current.temp_c;
                            }

                            if (tempC !== null && !isNaN(tempC)) {
                                temperatureTexte = Math.round(tempC) + "°C";
                            }

                            let iconBrut = "";
                            if (
                                meteoJson &&
                                meteoJson.current &&
                                meteoJson.current.condition &&
                                meteoJson.current.condition.icon
                            ) {
                                iconBrut = meteoJson.current.condition.icon;
                            }

                            if (iconBrut !== "") {
                                if (iconBrut.indexOf("//") === 0) {
                                    icone = "https:" + iconBrut;
                                } else {
                                    icone = iconBrut;
                                }
                            }
                        } catch (e) {

                        }
                    }


                    listeTemp.push({
                        id: String(i),
                        capitale: capitale,
                        pays: nomPays,
                        drapeau: drapeau,
                        temperature: temperatureTexte,
                        icone: icone,
                    });
                }




                listeTemp.sort(function (a, b) {
                    return a.capitale.localeCompare(b.capitale);
                });


                const listeFinale = [];
                for (let i = 0; i < listeTemp.length; i++) {
                    const item = listeTemp[i];
                    if (
                        item.temperature !== "?" &&
                        item.temperature !== null &&
                        item.temperature !== ""
                    ) {
                        listeFinale.push(item);
                    }
                }

                setDonnees(listeFinale);
            } catch (e) {
                setErreur("Impossible de charger la météo des capitales.");
            }

            setEnChargement(false);
        }

        chargerDonnees();
    }, []);

    if (erreur) {
        return (
            <View style={styles.center}>
                <Text>{erreur}</Text>
            </View>
        );
    }

    return (
        <NavigationUI title="Weather" parallax={parallax}>
            <View style={styles.page}>
                <Text style={styles.titre}>Météo des capitales (°C)</Text>

                {enChargement && (
                    <View style={styles.inlineLoading}>
                        <ActivityIndicator size="small" />
                        <Text style={styles.inlineLoadingText}>
                            Chargement de la météo...
                        </Text>
                    </View>
                )}

                <FlatList
                    data={donnees}
                    keyExtractor={function (item) {
                        return item.id;
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.gauche}>
                                <View style={styles.drapeauVille}>
                                    {item.drapeau ? (
                                        <Image source={{ uri: item.drapeau }} style={styles.drapeau} />
                                    ) : null}

                                    <Text style={styles.capitale}>{item.capitale}</Text>
                                </View>

                                <Text style={styles.pays}>{item.pays}</Text>
                            </View>

                            <View style={styles.meteoBox}>
                                {item.icone ? (
                                    <Image source={{ uri: item.icone }} style={styles.iconeMeteo} />
                                ) : (
                                    <Text style={styles.placeholder}>☀️</Text>
                                )}

                                <Text style={styles.temperature}>{item.temperature}</Text>
                            </View>
                        </View>
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
        alignItems: "center",
        paddingHorizontal: 16
    },
    page: {
        flex: 1,
        padding: 12,
        backgroundColor: "#f6f4f8"
    },
    titre: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
        color: "#673AB7"
    },
    inlineLoading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8
    },
    inlineLoadingText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#673AB7"
    },
    gauche: {
        flexDirection: "column"
    },
    meteoBox: {
        width: 120,
        backgroundColor: "#f7f4fcff",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    capitale: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222"
    },
    pays: {
        fontSize: 12,
        color: "#9e9e9eff",
        marginTop: 2,
        alignSelf: "flex-start"
    },
    drapeau: {
        width: 28,
        height: 18,
        borderRadius: 2
    },
    drapeauVille: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    iconeMeteo: {
        width: 30,
        height: 30
    },
    placeholder: {
        fontSize: 16,
        color: "#ffd700"
    },
    temperature: {
        fontSize: 14,
        fontWeight: "600",
        color: "#00acc1"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
});
