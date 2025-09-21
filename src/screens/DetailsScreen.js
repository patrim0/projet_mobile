import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { FontSizeContext } from '../context/FontSizeContext';   
import { useTextColor } from '../context/ColorContext';

export default function DetailsScreen() {
    const { theme } = useContext(ThemeContext);
    const { fontSize } = useContext(FontSizeContext);  
    const { textColor } = useTextColor();

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, { fontSize, color: textColor }]}>
                Écran Détails
            </Text>
            <Text style={[{ fontSize, color: textColor }, theme === 'dark' ? styles.dark : styles.light]}>
                Voici un écran poussé via la navigation de type Stack.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 16
    },
    title: { 
        fontWeight: '600', 
        marginBottom: 8 
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
