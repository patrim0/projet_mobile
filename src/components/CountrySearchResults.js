import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { findCountries } from "../api/countries";
import CountryCard from "./cards/CountryCard";

export default function CountrySearchResults({ query }) {

    const navigation = useNavigation();

    const [liste, setListe] = useState([]);
    const [charge, setCharge] = useState(false);

    useEffect(() => {
        let ok = true;
        const run = async () => {
            if (query.trim().length < 1) { setListe([]); return; }
            setCharge(true);
            try {
                const d = await findCountries(query.trim());
                const regex = new RegExp(`^${query.trim()}`, "i");
                const filtered = d.filter((c) => regex.test(c.name));
                if (ok) setListe(filtered);
            } catch (e) {
                if (ok) setListe([]);
            }
            if (ok) setCharge(false);
        };
        const t = setTimeout(run, 250);
        return () => { ok = false; clearTimeout(t); };
    }, [query]);

    const handleCardPress = (item) => {
        navigation.navigate("CountryDetailsScreen", { name: item.name });
    };

    return (
        <SafeAreaView style={s.wrap}>
            {charge ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
            <FlatList
                data={liste}
                keyExtractor={(it, i) => it.name + i}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleCardPress(item)}>
                        <CountryCard name={item.name} region={item.region} flag={item.flagPng} />
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
});
