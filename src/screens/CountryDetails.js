import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
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
    let devises = "Inconnues";

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

  
    return (
        <View style={styles.page}>
          <AnimationFlag uri={pays.flags.png} />
          <Text style={styles.nom}>{pays.name.common}</Text>

          <Text style={{ marginTop: 8, fontSize: 18 }}>
             Devise(s) : {devises}
            
          </Text>
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
