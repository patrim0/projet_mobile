
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { FontSizeContext } from '../context/FontSizeContext';
import { useBackground } from '../context/BackgroundContext';
import { useTextColor } from '../context/ColorContext';

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const { fontSize } = useContext(FontSizeContext);
    const { background } = useBackground();
    const { textColor, applyEverywhere } = useTextColor();
  
    const baseText = applyEverywhere ? { color: textColor } : (isDark ? styles.darkText : styles.lightText);

    const images = {
        bg1: require('../../assets/images/bg1.jpg'),
        bg2: require('../../assets/images/bg2.jpg'),
        bg3: require('../../assets/images/bg3.jpg'),
    };

    return (
        <ImageBackground source={images[background]} style={styles.background}>
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover' },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontWeight: '600', padding: 20 },
    light: { backgroundColor: 'transparent', color: '#111' }, // make background transparent so image shows
    dark: { backgroundColor: 'transparent', color: '#fff' },
});
