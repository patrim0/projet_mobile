import { View, Text, Image, StyleSheet } from "react-native";

export default function CountryCard({ name, region, flag }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: flag }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.region}>{region ? region : "-"}</Text>
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
    image: { 
        width: 64, 
        height: 42, 
        borderRadius: 6, 
        backgroundColor: "#eee" 
    },
    name: { 
        fontSize: 16, 
        fontWeight: "600" 
    },
    region: { 
        color: "#666" 
    },
});