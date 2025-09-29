import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FontSizeContext } from '../context/FontSizeContext';  
import { useBackground } from '../context/BackgroundContext';
import { useTextColor } from '../context/ColorContext';

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

const images = {
  bg1: require('../../assets/images/bg1.jpg'),
  bg2: require('../../assets/images/bg2.jpg'),
  bg3: require('../../assets/images/bg3.jpg'),
};

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
    const { fontSize } = useContext(FontSizeContext);
    const { background } = useBackground();
    const isDark = theme === 'dark';
    const { textColor, applyEverywhere } = useTextColor();

    
    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());
    const [second, setSecond] = useState(new Date().getSeconds());

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
      setSecond(new Date().getSeconds());
    }, 1000);
    return () => clearTimeout(timer);   
  }, [hour, minute, second]);   
  
 const themeTextColor = isDark ? '#ffffff' : '#111111';

  return(
    <ImageBackground source={images[background]} style={styles.background}>
      <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
        <Text style={[theme === 'dark' ? styles.dark : styles.light, { fontSize, color: applyEverywhere ? textColor : themeTextColor }]}>{t('DateAuj')}</Text>
        <Text style={[styles.date, theme === 'dark' ? styles.dark : styles.light, { fontSize: fontSize + 2, color: applyEverywhere ? textColor : themeTextColor }]}>
          {date} {monthNames[month]} {year}
        </Text>
        <Text style={[styles.time, theme === 'dark' ? styles.dark : styles.light, { fontSize: fontSize - 3, color: applyEverywhere ? textColor : themeTextColor }]}>
          {t('Heure')} {hour}:{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}
        </Text>
      </View>
    </ImageBackground>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16
  },
  date: {
    fontWeight: '600'
  },
  time: {
    fontWeight: '600', marginTop: 50
  },
  light: {
   color: '#111111'
  },
  dark: {
   color: '#ffffff'
  },
  background: { 
    flex: 1, resizeMode: 'cover' 
  }
});
