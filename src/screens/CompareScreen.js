import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CompareContext } from "../context/CompareContext";
import { compareCountries } from "../api/countries";
import NavigationUI from "../components/NavigationUI";

function ComparisonRow({ label, values, highlight = false }) {
    const numericValues = values.map(v => {
        const num = parseFloat(String(v).replace(/[^0-9.]/g, ''));
        return isNaN(num) ? null : num;
    });
    
    const maxValue = highlight && numericValues.some(v => v !== null) 
        ? Math.max(...numericValues.filter(v => v !== null)) 
        : null;

    return (
        <View style={styles.row}>
            <View style={styles.labelColumn}>
                <Text style={styles.labelText}>{label}</Text>
            </View>
            {values.map((value, index) => {
                const isMax = highlight && maxValue !== null && 
                    parseFloat(String(value).replace(/[^0-9.]/g, '')) === maxValue;
                
                return (
                    <View key={index} style={styles.valueColumn}>
                        <Text style={[styles.valueText, isMax && styles.highlightText]}>
                            {value}
                        </Text>
                        {isMax && <Ionicons name="trophy" size={16} color="#FFD700" style={{ marginLeft: 4 }} />}
                    </View>
                );
            })}
        </View>
    );
}

export default function CompareScreen({ parallax }) {
    const { selectedCountries, clearSelection } = useContext(CompareContext);
    const [countriesData, setCountriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const names = selectedCountries.map(c => c.name);
            const data = await compareCountries(names);
            setCountriesData(data);
            setLoading(false);
        }

        if (selectedCountries.length > 0) {
            loadData();
        }
    }, [selectedCountries]);

    const handleClear = () => {
        Alert.alert(
            "Effacer la selection",
            "Voulez-vous effacer tous les pays sélectionnes ?",
            [
                { text: "Annuler", style: "cancel" },
                { text: "Effacer", onPress: () => clearSelection(), style: "destructive" }
            ]
        );
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#673AB7" />
                <Text style={{ marginTop: 10 }}>Chargement des données...</Text>
            </View>
        );
    }

    if (countriesData.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Aucune donnée disponible</Text>
            </View>
        );
    }

    return (
        <NavigationUI title="Comparison" parallax={parallax}>
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ minWidth: '100%' }}>
                        {/* En-têtes avec drapeaux */}
                        <View style={styles.headerRow}>
                            <View style={styles.labelColumn}>
                                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                                    <Ionicons name="trash-outline" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            {countriesData.map((country, index) => (
                                <View key={index} style={styles.headerColumn}>
                                    <Image source={{ uri: country.flagPng }} style={styles.flag} />
                                    <Text style={styles.countryName}>{country.name}</Text>
                                </View>
                            ))}
                        </View>

                        <ScrollView style={styles.scrollContent}>
                            <ComparisonRow 
                                label="Nom officiel" 
                                values={countriesData.map(c => c.officialName)} 
                            />
                            
                            <ComparisonRow 
                                label="Population" 
                                values={countriesData.map(c => formatNumber(c.population))} 
                                highlight={true}
                            />
                            
                            <ComparisonRow 
                                label="Superficie km carre" 
                                values={countriesData.map(c => formatNumber(c.area))} 
                                highlight={true}
                            />
                            
                            <ComparisonRow 
                                label="Capitale" 
                                values={countriesData.map(c => c.capital)} 
                            />
                            
                            <ComparisonRow 
                                label="Region" 
                                values={countriesData.map(c => c.region)} 
                            />
                            
                            <ComparisonRow 
                                label="Sous-region" 
                                values={countriesData.map(c => c.subregion)} 
                            />
                            
                            <ComparisonRow 
                                label="Continent" 
                                values={countriesData.map(c => c.continents)} 
                            />
                            
                            <ComparisonRow 
                                label="Langues" 
                                values={countriesData.map(c => c.languages)} 
                            />
                            
                            <ComparisonRow 
                                label="Monnaies" 
                                values={countriesData.map(c => c.currencies)} 
                            />
                            
                            <ComparisonRow 
                                label="Pays frontaliers" 
                                values={countriesData.map(c => c.borders)} 
                                highlight={true}
                            />
                            
                            <ComparisonRow 
                                label="Sans littoral" 
                                values={countriesData.map(c => c.landlocked)} 
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f4f8',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#673AB7',
        paddingVertical: 16,
        elevation: 4,
    },
    headerColumn: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 8,
        minWidth: 150,
    },
    flag: {
        width: 80,
        height: 50,
        borderRadius: 8,
        marginBottom: 8,
    },
    countryName: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
    scrollContent: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        minHeight: 60,
    },
    labelColumn: {
        width: 140,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
        borderRightWidth: 2,
        borderRightColor: '#673AB7',
    },
    labelText: {
        fontWeight: '600',
        fontSize: 13,
        color: '#333',
    },
    valueColumn: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
        minWidth: 150,
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 13,
        color: '#555',
        flexWrap: 'wrap',
    },
    highlightText: {
        fontWeight: '700',
        color: '#673AB7',
    },
    clearButton: {
        backgroundColor: '#d32f2f',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'center',
    },
});