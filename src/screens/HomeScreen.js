import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    const { t } = useTranslation();

    return (
        
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light]}>{t('Accueil')}</Text>

            <Button title={t('AllerDetails')} onPress={() => navigation.navigate('Details')} />

            <View style={{ height: 20 }} />
            
            <Button title={t('VoirCompteur')} onPress={() => navigation.navigate('Counter')} />
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