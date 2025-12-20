import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

export default function ExchangeRates() {
  const [donnees, setDonnees] = useState([]);
  const [charge, setCharge] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
         
        const repPays = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies,flags"
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

         
          let drapeauUri = "";
          if (pays.flags && pays.flags.png) {
            drapeauUri = pays.flags.png;
          }

          
          let texteDevise = "Devise inconnue";
          let valeurAffichee = "- - -";

          if (pays.currencies) {
            const codes = Object.keys(pays.currencies);
            const code = codes.length > 0 ? codes[0] : null;

            if (code) {
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

              
              texteDevise = nomDevise + " - " + code + symbole;

              
              const cleTaux = code.toLowerCase();
              const valeurTaux = rates[cleTaux];

              if (typeof valeurTaux === "number") {
                valeurAffichee = valeurTaux.toFixed(3);
              }
            }
          }

          liste.push({
            id: String(i),
            deviseNom: texteDevise,
            drapeau: drapeauUri,
            taux: valeurAffichee,
          });
        }

        
        liste.sort(function (a, b) {
          return a.deviseNom.localeCompare(b.deviseNom);
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
              
              <View style={styles.gauche}>
                <Text style={styles.nomDevise}>{item.deviseNom}</Text>
                {item.drapeau ? (
                  <Image
                    source={{ uri: item.drapeau }}
                    style={styles.drapeau}
                  />
                ) : null}
              </View>

              
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
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  gauche: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  nomDevise: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
  drapeau: {
    width: 28,
    height: 18,
    borderRadius: 2,
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
