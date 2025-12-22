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
                temperatureTexte = tempC.toFixed(1) + "°C";
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
        renderItem={function ({ item }) {
          let drapeauComp = null;
          if (item.drapeau) {
            drapeauComp = (
              <Image source={{ uri: item.drapeau }} style={styles.drapeau} />
            );
          }

          let iconeComp = <Text style={styles.placeholder}>☀️</Text>;
          if (item.icone) {
            iconeComp = (
              <Image source={{ uri: item.icone }} style={styles.iconeMeteo} />
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
                <Text style={styles.temperature}>{item.temperature}</Text>
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
    paddingHorizontal: 16,
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
  inlineLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  inlineLoadingText: {
    marginLeft: 8,
    fontSize: 14,
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
