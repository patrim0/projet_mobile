import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CompareContext } from "../../context/CompareContext";

export default function CompareFloatingButton() {
    const { selectedCountries } = useContext(CompareContext);
    const navigation = useNavigation();
    const route = useRoute();

    if (selectedCountries.length < 2 || route.name !== "AllCountries") {
        return null;
    }

    const handlePress = () => {
        navigation.navigate("CompareCountries");
    };

    return (
        <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <Ionicons name="git-compare" size={24} color="#fff" />
                <Text style={styles.text}>
                    Comparer ({selectedCountries.length})
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#673AB7',
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});