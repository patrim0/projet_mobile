import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTextColor } from '../context/ColorContext';
import { FontSizeContext } from '../context/FontSizeContext';
import { ThemeContext } from '../context/ThemeContext';

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();


const monthNames = [
  "Janvier","Fevrier","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];

export default function TodayScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { fontSize } = useContext(FontSizeContext);
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
    <View style={[styles.container, isDark ? styles.dark : styles.light]}>
      <Text style={{ fontSize, color: applyEverywhere ? textColor : themeTextColor }}>
        La date d'aujourd'hui est le
      </Text>

      <Text style={[styles.date, { fontSize: fontSize + 2, color: applyEverywhere ? textColor : themeTextColor }]}>
        {date} {monthNames[month]} {year}
      </Text>

      <Text style={[styles.time, { fontSize: fontSize - 3, color: applyEverywhere ? textColor : themeTextColor }]}>
        Il est présentement {hour}h{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}
      </Text>
    </View>
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
    backgroundColor: '#ffffff', color: '#111111'
  },
  dark: {
    backgroundColor: '#111111', color: '#ffffff'
  }
});
