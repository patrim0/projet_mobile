import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RightMenu({ visible, onClose, width = 260 }) {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const go = (screen) => {
    onClose && onClose();
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.overlay, { display: visible ? 'flex' : 'none' }]}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sidebar, { width, transform: [{ translateX }] }]}>
        <Text style={styles.header}>Menu</Text>
        <View style={styles.separator} />

        <Text style={styles.menuItem} onPress={() => go('Countries')}>
          Countries
        </Text>

        <Text style={styles.menuItem} onPress={() => go('ExchangeRates')}>
          Exchange Rates
        </Text>

        <View style={{ flex: 1 }} />

        <Text style={styles.menuItem} onPress={() => go('Language')}>
          Language
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#F5EEF9',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
    marginBottom: 25,
  },
  menuItem: {
    fontSize: 15,
    marginBottom: 25,
    color: '#222',
  },
});

