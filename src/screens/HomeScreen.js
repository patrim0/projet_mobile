import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTextColor } from '../context/ColorContext';
import { FontSizeContext } from '../context/FontSizeContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { fontSize } = useContext(FontSizeContext);
  const { textColor, applyEverywhere } = useTextColor();

  const baseText = applyEverywhere ? { color: textColor } : (isDark ? styles.darkText : styles.lightText);

  return (
    <View style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <Text style={[styles.title, { fontSize }, baseText]}>Accueil</Text>

      <Text
        style={[{ fontSize, marginBottom: 12 }, baseText]}
        onPress={() => navigation.navigate('Today')}
      >
        Aller à la date d'aujourd'hui
      </Text>

      <Text
        style={[{ fontSize, marginBottom: 12 }, baseText]}
        onPress={() => navigation.navigate('Details')}
      >
        Aller aux Détails
      </Text>

      <Text
        style={[{ fontSize, marginBottom: 12 }, baseText]}
        onPress={() => navigation.navigate('Counter')}
      >
        Voir le Compteur
      </Text>

      <Text
        style={[{ fontSize, marginBottom: 12 }, baseText]}
        onPress={() => navigation.navigate('Settings')}
      >
        Aller aux Paramètres
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: '600', padding: 20 },
  lightBg: { backgroundColor: '#fff' },
  darkBg: { backgroundColor: '#111' },
});
