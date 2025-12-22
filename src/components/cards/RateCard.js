import { View, Text, StyleSheet } from "react-native";

export default function RateCard({ code, rate }) {
    return (
        <View style={styles.card}>
            <Text style={styles.code}>{code}</Text>

            <View style={styles.deviseBox}>
                <Text style={styles.rate}>{rate}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 2
    },
    code: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        letterSpacing: 0.5,
        flex: 1,
    },
    rate: {
        fontSize: 14,
        fontWeight: "700",
        color: "#673AB7",
        fontFamily: "Menlo",
    },
    deviseBox: {
        width: 120,
        backgroundColor: "#f0ebfa",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center",
    },
});