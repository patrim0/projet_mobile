import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
    
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeText = (theme === 'dark' ? t('ModeSombre') : t('ModeClair'));
    
    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light]}>{t('Parametres')}</Text>
            <View style={styles.row}>
                <Text style={theme === 'dark' ? styles.dark : styles.light}>{themeText}</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            <View>
                <Button title={t('Francais')} onPress={() => i18n.changeLanguage('fr')}/>

                <Button title={t('Anglais')} onPress={() => i18n.changeLanguage('en')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16 
    },
    title: { 
        fontSize: 22, 
        fontWeight: '600', 
        marginBottom: 12 
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
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