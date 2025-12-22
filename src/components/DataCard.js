import { View, Text, Image, StyleSheet } from "react-native";

export default function DataCard({ nom, reg, url }) {
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

const s = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: "#f6f4f8" },
    input: { margin: 12, borderRadius: 12, padding: 12, backgroundColor: "#fff" },
    card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, marginVertical: 6, backgroundColor: "#fff", borderRadius: 12, elevation: 2 },
    img: { width: 64, height: 42, borderRadius: 6, backgroundColor: "#eee" },
    nom: { fontSize: 16, fontWeight: "600" },
    reg: { color: "#666" },
});