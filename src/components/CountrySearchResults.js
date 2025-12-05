import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { findCountries } from "../api/countries";

function FlagCard({ nom, reg, url }) {
  return (
    <View style={s.card}>
      <Image source={{ uri: url }} style={s.img} />
      <View style={{ flex: 1 }}>
        <Text style={s.nom}>{nom}</Text>
        <Text style={s.reg}>{reg ? reg : "-"}</Text>
      </View>
    </View>
  );
}

export default function CountrySearchResults({ query }) {

  const navigation = useNavigation();

  const [liste, setListe] = useState([]);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    let ok = true;
    const run = async () => {
      if (query.trim().length < 2) { setListe([]); return; }
      setCharge(true);
      try {
        const d = await findCountries(query.trim());
        const regex = new RegExp(`^${query.trim()}`, "i");
        const filtered = d.filter((c) => regex.test(c.name));
        if (ok) setListe(filtered);
      } catch(e) {
        if (ok) setListe([]);
      }
      if (ok) setCharge(false);
    };
    const t = setTimeout(run, 250);
    return () => { ok = false; clearTimeout(t); };
  }, [query]);

  return (
    <SafeAreaView style={s.wrap}>
      {charge ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
      <FlatList
        data={liste}
        keyExtractor={(it, i) => it.name + i}
        renderItem={({ item }) => (
           <Pressable onPress={() => navigation.navigate("CountryDetails", { name: item.name })}>
             <FlagCard nom={item.name} reg={item.region} url={item.flagPng} />
           </Pressable>
        )}
        contentContainerStyle={{ padding: 12 }}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#f6f4f8" },
  input: { margin: 12, borderRadius: 12, padding: 12, backgroundColor: "#fff" },
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, marginVertical: 6, backgroundColor: "#fff", borderRadius: 12, elevation: 2 },
  img: { width: 64, height: 42, borderRadius: 6, backgroundColor: "#eee" },
  nom: { fontSize: 16, fontWeight: "600" },
  reg: { color: "#666" },
});
