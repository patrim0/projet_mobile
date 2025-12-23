import { View, Text, Image, StyleSheet } from "react-native";

export default function WeatherCard({ capital, country, flag, temperature, icon }) {
    return (
        <View style={styles.card}>
            <View style={styles.gauche}>
                <View style={styles.drapeauVille}>
                    {flag 
                    ? ( <Image source={{ uri: flag }} style={styles.drapeau} /> ) 
                    : null
                    }
                    <Text style={styles.capitale}>{capital}</Text>
                </View>

                <Text style={styles.pays}>{country}</Text>
            </View>

            <View style={styles.meteoBox}>
                {icon 
                ? ( <Image source={{ uri: icon }} style={styles.iconeMeteo} /> ) 
                : ( <Text style={styles.placeholder}>☀️</Text>)
                }
                <Text style={styles.temperature}>{temperature}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 2
    },
    gauche: {
        flexDirection: "column"
    },
    drapeau: {
        width: 28,
        height: 18,
        borderRadius: 2
    },
    drapeauVille: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    capitale: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222"
    },
    pays: {
        fontSize: 12,
        color: "#9e9e9eff",
        marginTop: 2,
        alignSelf: "flex-start"
    },
    iconeMeteo: {
        width: 30,
        height: 30
    },
    placeholder: {
        fontSize: 16,
        color: "#ffd700"
    },
    temperature: {
        fontSize: 14,
        fontWeight: "600",
        color: "#00acc1"
    },
    meteoBox: {
        width: 120,
        backgroundColor: "#f7f4fcff",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center"
    },
});