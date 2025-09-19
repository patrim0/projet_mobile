import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
    
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeText = (theme === 'dark' ? "Mode sombre" : "Mode clair");

    const { i18n } = useTranslation();

    const onSelectLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light]}>Paramètres</Text>
            <View style={styles.row}>
                <Text style={theme === 'dark' ? styles.dark : styles.light}>{themeText}</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            <View>
                <Button title="Changer de langue" onPress={onSelectLanguage('en')}/>
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