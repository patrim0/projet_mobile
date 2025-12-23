import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NavigationUI from "../components/NavigationUI";

import CountrySearchResults from '../components/CountrySearchResults';

export default function CountrySearchScreen({ parallax }) {

    const [search, setSearch] = useState("");

    return (
        <NavigationUI title="WorldInfo" parallax={parallax}>
            <View style={styles.page}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchLabel}>Search Country</Text>

                    <View style={styles.searchBox}>
                        <TextInput style={styles.input} placeholder="Search..." value={search} onChangeText={setSearch}/>

                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                                <MaterialIcons name="cancel" size={20} color="#673AB7" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    {search.length >= 1 && (
                        <CountrySearchResults query={search} />
                    )}
                </View>
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    page: {
         flex: 1,
         backgroundColor: "#f6f4f8" 
    },
    searchContainer: {
        paddingHorizontal: 20,
        backgroundColor: "#f6f4f8" 
    },
    searchLabel: {
        fontSize: 12,
        marginBottom: 6,
        paddingLeft: 10,
        paddingTop: 25,
        color: '#673AB7'
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#673AB7',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        backgroundColor: "#fff"
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    clearButton: {
        padding: 6
    }
});
