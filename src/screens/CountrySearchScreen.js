import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NavigationUI from "../components/NavigationUI";

import CountrySearchResults from '../components/CountrySearchResults';

export default function CountrySearchScreen({ parallax }) {

    const { t } = useTranslation();

    const [search, setSearch] = useState("");

    return (
        <NavigationUI title="WorldInfo" parallax={parallax}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchLabel}>Search Country</Text>

                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search..."
                            value={search}
                            onChangeText={setSearch}
                        />

                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                                <MaterialIcons name="cancel" size={20} color="#673AB7" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    {search.length >= 2 && (
                        <CountrySearchResults query={search} />
                    )}
                </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    topBar: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: '600',
        fontSize: 20
    },
    searchContainer: {
        marginTop: 25,
        paddingHorizontal: 20
    },
    searchLabel: {
        fontSize: 12,
        marginBottom: 6,
        paddingLeft: 10,
        color: '#673AB7'
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#673AB7',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    clearButton: {
        padding: 6
    },
    light: {
        backgroundColor: '#ffffff',
        color: '#111111'
    },
    dark: {
        backgroundColor: '#111111',
        color: '#ffffff'
    }
});
