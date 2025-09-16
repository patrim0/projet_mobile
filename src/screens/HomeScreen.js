import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light]}>Accueil</Text>

            <Button title="Aller aux Détails" onPress={() => navigation.navigate('Details')} />

            <View style={{ height: 20 }} />
            
            <Button title="Voir le Compteur" onPress={() => navigation.navigate('Counter')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    title: { 
        fontSize: 22, 
        fontWeight: '600',
        padding: 20
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