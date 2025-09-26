import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { FontSizeContext } from '../context/FontSizeContext';

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const { fontSize } = useContext(FontSizeContext);

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, { fontSize }, theme === 'dark' ? styles.dark : styles.light]}>
                Accueil
            </Text>
           
            <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Today')}>
                Aller à la date d'aujourd'hui
            </Text>

            <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Details')}>
                Aller aux Détails
            </Text>
            <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Counter')}>
                Voir le Compteur
            </Text>

            <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Settings')}>
                Aller aux Paramètres
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontWeight: '600', padding: 20 },
    light: { backgroundColor: '#fff', color: '#111' },
    dark: { backgroundColor: '#111', color: '#fff' },
});
