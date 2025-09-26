import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { FontSizeContext } from '../context/FontSizeContext';   

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

const monthNames = [
  "Janvier","Fevrier","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];

export default function TodayScreen() {
  const { theme } = useContext(ThemeContext);
  const { fontSize } = useContext(FontSizeContext);  

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

  return(
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <Text style={[theme === 'dark' ? styles.dark : styles.light, { fontSize }]}>La date d'aujourd'hui est le</Text>
      <Text style={[styles.date, theme === 'dark' ? styles.dark : styles.light, { fontSize: fontSize + 2 }]}>
        {date} {monthNames[month]} {year}
      </Text>
      <Text style={[styles.time, theme === 'dark' ? styles.dark : styles.light, { fontSize: fontSize - 3 }]}>
        Il est présentement {hour}h{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}
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
