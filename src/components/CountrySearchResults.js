import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { findCountries } from "../api/countries";
import { CompareContext } from "../context/CompareContext";

function FlagCard({ nom, reg, url, isSelected, onToggleSelect, onCardPress, canSelect }) {
    const handleSelectPress = () => {
        if (!isSelected && !canSelect) {
            Alert.alert("Limite atteinte", "Vous pouvez comparer maximum 3 pays.");
            return;
        }
        onToggleSelect();
    };

    return (
        <View style={[s.card, isSelected && s.cardSelected]}>
            <TouchableOpacity 
                onPress={handleSelectPress}
                style={s.checkbox}
                activeOpacity={0.6}
            >
                <Ionicons 
                    name={isSelected ? "checkbox" : "square-outline"} 
                    size={28} 
                    color={isSelected ? "#673AB7" : "#999"} 
                />
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={onCardPress}
                style={s.cardContent}
                activeOpacity={0.7}
            >

                <Image source={{ uri: url }} style={s.img} />
                <View style={{ flex: 1 }}>
                    <Text style={s.nom}>{nom}</Text>
                    <Text style={s.reg}>{reg ? reg : "-"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default function CountrySearchResults({ query }) {

    const navigation = useNavigation();

    const { toggleCountry, isSelected, canAddMore } = useContext(CompareContext);

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
            } catch (e) {
                if (ok) setListe([]);
            }
            if (ok) setCharge(false);
        };
        const t = setTimeout(run, 250);
        return () => { ok = false; clearTimeout(t); };
    }, [query]);

    const handleToggleSelect = (item) => {
        toggleCountry(item);
    };

    const handleCardPress = (item) => {
        navigation.navigate("CountryDetails", { name: item.name });
    };

    return (
        <SafeAreaView style={s.wrap}>
            {charge ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
            <FlatList
                data={liste}
                keyExtractor={(it, i) => it.name + i}
                renderItem={({ item }) => (
                    <FlagCard 
                        nom={item.name} 
                        reg={item.region} 
                        url={item.flagPng}
                        isSelected={isSelected(item.name)}
                        onToggleSelect={() => handleToggleSelect(item)}
                        canSelect={canAddMore()}
                        onCardPress={() => handleCardPress(item)}
                    />
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
