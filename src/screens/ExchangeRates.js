// src/screens/ExchangeRates.js
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
        
        const repPays = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies"
        );
        const dataPays = await repPays.json(); 

        
        const repTaux = await fetch(
          "https://latest.currency-api.pages.dev/v1/currencies/usd.json"
        );
        const dataTaux = await repTaux.json(); 

        let rates = {};
        if (dataTaux && dataTaux.usd) {
          rates = dataTaux.usd;
        }

        const liste = [];

        for (let i = 0; i < dataPays.length; i++) {
          const pays = dataPays[i];

           
          let nom = "Pays inconnu";
          if (pays.name && pays.name.common) {
            nom = pays.name.common;
          }

           
          let deviseTexte = "Inconnue";

          if (pays.currencies) {
            const codes = Object.keys(pays.currencies);

            if (codes.length > 0) {
               
              const code = codes[0];  
              let info = pays.currencies[code];
              if (!info) {
                info = {};
              }

              let nomDevise = "Inconnue";
              if (info.name) {
                nomDevise = info.name;
              }

              let symbole = "";
              if (info.symbol) {
                symbole = " (" + info.symbol + ")";
              }

              // taux 1 USD -> devise du pays
              const cleTaux = code.toLowerCase();
              const valeurTaux = rates[cleTaux];

              let tauxTexte = "Taux inconnu";
              if (typeof valeurTaux === "number") {
                const arrondi = valeurTaux.toFixed(3);
                tauxTexte = "1 USD = " + arrondi + " " + code;
              }

              deviseTexte =
                nomDevise + " - " + code + symbole + " - " + tauxTexte;
            }
          }

          liste.push({
            id: nom + "-" + i,
            pays: nom,
            devise: deviseTexte,
          });
        }

        
        liste.sort(function (a, b) {
          return a.pays.localeCompare(b.pays);
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
      <Text style={styles.titre}>Devises et taux (base USD)</Text>

      <FlatList
        data={donnees}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          return (
            <View style={styles.ligne}>
              <Text style={styles.nomPays}>{item.pays}</Text>
              <View style={styles.deviseBox}>
                <Text style={styles.devise}>{item.devise}</Text>
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
  },
  titre: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  ligne: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  nomPays: {
    fontSize: 16,
    fontWeight: "600",
  },
  deviseBox: {
    backgroundColor: "#111",    
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    maxWidth: "55%",
  },
  devise: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00ff66",          
    fontFamily: "Menlo",     
    textAlign: "right",
  },
});
