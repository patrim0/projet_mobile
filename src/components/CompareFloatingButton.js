import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { CompareContext } from "../context/CompareContext";

export default function CompareFloatingButton() {
    const { selectedCountries } = useContext(CompareContext);
    const navigation = useNavigation();

    if (selectedCountries.length < 2) {
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