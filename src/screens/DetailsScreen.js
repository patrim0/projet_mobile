import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FontSizeContext } from '../context/FontSizeContext';
import { useTextColor } from '../context/ColorContext';

export default function DetailsScreen() {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { fontSize } = useContext(FontSizeContext);
    const { textColor, applyEverywhere } = useTextColor();

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light, { fontSize, color: textColor }]}>{t('EcranDetails')}</Text>
            <Text style={[theme === 'dark' ? styles.dark : styles.light, { fontSize, color: textColor }]}>{t('DescDetails')}</Text>
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
