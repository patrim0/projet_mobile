import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const WEATHER_API_KEY = "24923ddba8b949cb902144825252012";

export default function CapitalsWeather() {
  const [donnees, setDonnees] = useState([]);
  const [charge, setCharge] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
        
        const repPays = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,capitalInfo,flags"
        );
        const dataPays = await repPays.json();

        const liste = [];

        for (let i = 0; i < dataPays.length; i++) {
          const pays = dataPays[i];

         
          let capitale = "Inconnue";
          if (pays.capital && pays.capital.length > 0) {
            capitale = pays.capital[0];
          }

          
          let drapeauUri = "";
          if (pays.flags && pays.flags.png) {
            drapeauUri = pays.flags.png;
          }

          
          let lat = null;
          let lon = null;
          if (
            pays.capitalInfo &&
            pays.capitalInfo.latlng &&
            pays.capitalInfo.latlng.length === 2
          ) {
            lat = pays.capitalInfo.latlng[0];
            lon = pays.capitalInfo.latlng[1];
          }

          // Valeurs météo par défaut
          let tempTexte = "?";
          let iconeUri = "";

          if (capitale !== "Inconnue") {
            try {
              
              let q = capitale;
              if (lat !== null && lon !== null) {
                q = lat + "," + lon;
              }

              const url =
                "https://api.weatherapi.com/v1/current.json" +
                "?key=" +
                WEATHER_API_KEY +
                "&q=" +
                encodeURIComponent(q) +
                "&aqi=no";

              const repMeteo = await fetch(url);
              const dataMeteo = await repMeteo.json();

              
              let tempC = null;
              if (dataMeteo && dataMeteo.current) {
                tempC = dataMeteo.current.temp_c;
              }

              if (tempC !== null && !isNaN(tempC)) {
                tempTexte = tempC.toFixed(1) + "°C";
              }

              
              let iconBrut = "";
              if (
                dataMeteo &&
                dataMeteo.current &&
                dataMeteo.current.condition &&
                dataMeteo.current.condition.icon
              ) {
                iconBrut = dataMeteo.current.condition.icon;
              }

              if (iconBrut !== "") {
                if (iconBrut.indexOf("//") === 0) {
                  iconeUri = "https:" + iconBrut;
                } else {
                  iconeUri = iconBrut;
                }
              }
            } catch (e) {
              
            }
          }

          liste.push({
            id: String(i),
            capitale: capitale,
            drapeau: drapeauUri,
            temp: tempTexte,
            icone: iconeUri,
          });
        }

        
        liste.sort(function (a, b) {
          return a.capitale.localeCompare(b.capitale);
        });

        setDonnees(liste);
      } catch (e) {
        setErreur("Impossible de charger la météo des capitales.");
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
      <Text style={styles.titre}>Météo des capitales (°C)</Text>

      <FlatList
        data={donnees}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({ item }) {
          
          let drapeauComp = null;
          if (item.drapeau) {
            drapeauComp = (
              <Image source={{ uri: item.drapeau }} style={styles.drapeau} />
            );
          }

          
          let iconeComp = (
            <Text style={styles.placeholder}>☀️</Text>
          );
          if (item.icone) {
            iconeComp = (
              <Image
                source={{ uri: item.icone }}
                style={styles.iconeMeteo}
              />
            );
          }

          return (
            <View style={styles.ligne}>
              
              <View style={styles.gauche}>
                <Text style={styles.capitale}>{item.capitale}</Text>
                {drapeauComp}
              </View>

              
              <View style={styles.meteoBox}>
                {iconeComp}
                <Text style={styles.temperature}>{item.temp}</Text>
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
  capitale: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
  drapeau: {
    width: 28,
    height: 18,
    borderRadius: 2,
  },
  meteoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    minWidth: 80,
    justifyContent: "flex-end",
  },
  iconeMeteo: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  placeholder: {
    fontSize: 16,
    marginRight: 4,
    color: "#ffd700",
  },
  temperature: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00d4ff",
    textAlign: "right",
  },
});
