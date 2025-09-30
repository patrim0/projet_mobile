import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

    return (
        <ImageBackground source={images[background]} style={styles.background}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
            <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
                <Text style={[styles.title, { fontSize, color: applyEverywhere ? textColor : baseText }]}>
                    {t('Accueil')}
                </Text>

                <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Today')}>
                    {t('AllerDate')}
                </Text>

                <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Details')}>
                    {t('AllerDetails')}
                </Text>

                <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Counter')}>
                    {t('VoirCompteur')}
                </Text>

                <Text style={{ fontSize, color: 'blue', marginBottom: 12 }} onPress={() => navigation.navigate('Settings')}>
                    {t('AllerParam')}
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
