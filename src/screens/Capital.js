import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Capital() {
  const [donnees, setDonnees] = useState([]);
  const [charge, setCharge] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const rep = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital"
        );
        const data = await rep.json();

        const liste = data
          .map((pays) => {
            const nom = pays.name?.common || "Pays inconnu";
            const capitale =
              pays.capital && pays.capital.length > 0
                ? pays.capital[0]
                : "Inconnue";
            return {
              id: nom + "-" + capitale,
              pays: nom,
              capitale: capitale,
            };
          })
          .sort((a, b) => a.pays.localeCompare(b.pays));

        setDonnees(liste);
      } catch (e) {
        setErreur("Impossible de charger la liste des capitales.");
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
      <Text style={styles.titre}>Capitales du monde</Text>

      <FlatList
        data={donnees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ligne}>
            <Text style={styles.nomPays}>{item.pays}</Text>
            <Text style={styles.capitale}>{item.capitale}</Text>
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
    fontSize: 16,
    fontWeight: "600",
    color : "#000",
  },
  capitale: {
    fontSize: 14,
    fontStyle: "italic",
    color : "#555",
  },
});
