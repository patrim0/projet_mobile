import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ExchangeRates() {
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
    <View style={styles.page}>
      <Text style={styles.titre}>Taux des devises (base USD)</Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerCode}>Code</Text>
        <Text style={styles.headerRate}>Rate</Text>
      </View>

      <FlatList
        data={donnees}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          return (
            <View style={styles.ligne}>
              
              <Text style={styles.code}>{item.codeDevise}</Text>

              <View style={styles.deviseBox}>
                <Text style={styles.valeur}>{item.taux}</Text>
              </View>

            </View>
          );
        }}
      />
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
    paddingHorizontal: 16,
    paddingTop: 16
  },
  titre: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center"
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea"
  },
  code: {
    width: 56,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5
  },
  deviseBox: {
    marginLeft: "auto",
    backgroundColor: "#111",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "flex-end"
  },
  valeur: {
    fontSize: 14,
    fontWeight: "700",
    color: "red",
    fontFamily: "Menlo",
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingBottom: 6,
    marginBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#673AB7",
  },
  headerCode: {
    width: 56,
    fontSize: 12,
    fontWeight: "700",
    color: "#673AB7",
    textTransform: "uppercase",
  },
  headerRate: {
    marginLeft: "auto",
    fontSize: 12,
    fontWeight: "700",
    color: "#673AB7",
    textTransform: "uppercase",
  },
});
