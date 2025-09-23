import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

export default function TodayScreen() {

    const { t } = useTranslation();

    const monthNames = [
        t('Janvier'),
        t('Fevrier'),
        t('Mars'),
        t('Avril'),
        t('Mai'),
        t('Juin'),
        t('Juillet'),
        t('Aout'),
        t('Septembre'),
        t('Octobre'),
        t('Novembre'),
        t('Decembre')
    ];

    const { theme } = useContext(ThemeContext);
    
    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());
    const [second, setSecond] = useState(new Date().getSeconds());

    useEffect(() => {
        setTimeout(() => {
            setHour(new Date().getHours());
            setMinute(new Date().getMinutes());
            setSecond(new Date().getSeconds());
        }, 1000)
    });

    return(
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={theme === 'dark' ? styles.dark : styles.light}>{t('DateAuj')}</Text>
            <Text style={[styles.date, theme === 'dark' ? styles.dark : styles.light]}>{date} {monthNames[month]} {year}</Text>
            <Text style={[styles.time, theme === 'dark' ? styles.dark : styles.light]}>{t('Heure')} {hour}:{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}</Text>
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
    date: { 
        fontSize: 20, 
        fontWeight: '600'
    },
    time: { 
        fontSize: 15, 
        fontWeight: '600', 
        marginTop: 50 
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