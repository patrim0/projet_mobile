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

      <FlatList
        data={donnees}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          return (
            <View style={styles.ligne}>
              
              <Text style={styles.code}>{item.codeDevise}</Text>

              
              <View style={styles.spacer} />

              
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
    alignItems: "center",
  },
  page: {
    flex: 1,
    padding: 16,
    alignItems: "center",  
  },
  titre: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  ligne: {
    width: "80%", 
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  code: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
  },
  spacer: {
    flex: 1,
    marginHorizontal: 16, 
  },
  deviseBox: {
    backgroundColor: "#111",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    minWidth: 70,
    alignItems: "flex-end", 
  },
  valeur: {
    fontSize: 14,
    fontWeight: "700",
    color: "red",
    fontFamily: "Menlo",
    textAlign: "right",
  },
});
