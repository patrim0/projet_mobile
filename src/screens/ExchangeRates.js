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
        const rep = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies"
        );
        const data = await rep.json(); 

        const liste = [];

        
        for (let i = 0; i < data.length; i++) {
          const pays = data[i];

          
          let nom = "Pays inconnu";
          if (pays.name && pays.name.common) {
            nom = pays.name.common;
          }

          
          let deviseTexte = "Inconnue";

          if (pays.currencies) {
            const codes = Object.keys(pays.currencies); 

            if (codes.length > 0) {
              const morceaux = [];

              for (let j = 0; j < codes.length; j++) {
                const code = codes[j];
                const info = pays.currencies[code] || {};

                let nomDevise = "Inconnue";
                if (info.name) {
                  nomDevise = info.name;
                }

                let symbole = "";
                if (info.symbol) {
                  symbole = " (" + info.symbol + ")";
                }

                const texte = code + " - " + nomDevise + symbole;
                morceaux.push(texte);
              }

              deviseTexte = morceaux.join(", ");
            }
          }

          liste.push({
            id: nom + "-" + deviseTexte,
            pays: nom,
            devise: deviseTexte,
          });
        }

        
        liste.sort((a, b) => a.pays.localeCompare(b.pays));

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
      <Text style={styles.titre}>Devises par pays</Text>

      <FlatList
        data={donnees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ligne}>
            <Text style={styles.nomPays}>{item.pays}</Text>
            <Text style={styles.devise}>{item.devise}</Text>
          </View>
        )}
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
    fontSize: 13,
    fontWeight: "600",
  },
  devise: {
    fontSize: 8,
    color: "#555",
  },
});
