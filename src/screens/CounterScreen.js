import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useCounter } from '../hooks/useCounter';
import { FontSizeContext } from '../context/FontSizeContext';

export default function CounterScreen() {
  const { count, increment, decrement, reset } = useCounter(0);
  const { theme } = useContext(ThemeContext);
  const { fontSize } = useContext(FontSizeContext);

  return (
      <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
          <Text style={[styles.value, { fontSize }, theme === 'dark' ? styles.dark : styles.light]}>
            Compteur : {count}
          </Text>
          <View style={styles.row}>
              <Button title="+1" onPress={increment} />
              <View style={{ width: 12 }} />
              <Button title="-1" onPress={decrement} />
              <View style={{ width: 12 }} />
              <Button title="Reset" onPress={reset} />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
  },
  value: { 
      fontSize: 22,   
      marginBottom: 16 
  },
  row: { 
      flexDirection: 'row', 
      alignItems: 'center' 
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
