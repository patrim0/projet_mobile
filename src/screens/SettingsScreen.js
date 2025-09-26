import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FontSizeContext } from '../context/FontSizeContext';
import { ThemeContext } from '../context/ThemeContext';
import { Slider } from 'react-native-elements';

export default function SettingsScreen() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { fontSize, setFontSize } = useContext(FontSizeContext);
  
    const themeText = theme === 'dark' ? "Mode sombre" : "Mode clair"; 
  
    return (
      <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
        <Text style={[ styles.title, { color: theme === 'dark' ? '#fff' : '#111' }]}> Paramètres </Text>
        <View style={styles.row}>
          <Text style={theme === 'dark' ? styles.dark : styles.light}>{themeText}</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      <View style={styles.sliderContainer}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#111', fontSize: 12 }}>A</Text>


        <Slider
          value={fontSize}
          onValueChange={setFontSize}
          minimumValue={12}
          maximumValue={32}
          step={1}
          style={{ flex: 1, marginHorizontal: 12 }}
          thumbStyle={{ height: 24, width: 24, backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1 }}
          trackStyle={{ height: 4, borderRadius: 2 }}
          minimumTrackTintColor="#347af7"
          maximumTrackTintColor="#bbb"
        />
        <Text style={{ color: theme === 'dark' ? '#fff' : '#111', fontSize: 24 }}>A</Text>
      </View>

      <Text
  style={{ color: theme === 'dark' ? '#fff' : '#111', fontSize: fontSize, marginTop: 16 }}>Aperçu de la taille du texte</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sliderContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 32 },
    light: { backgroundColor: '#ffffff', color: '#111111' },
    dark: { backgroundColor: '#111111', color: '#ffffff' },
});
