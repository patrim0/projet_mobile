import { useContext } from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useCounter } from '../hooks/useCounter';
import { FontSizeContext } from '../context/FontSizeContext';
import { useTextColor } from '../context/ColorContext';
import { useBackground } from '../context/BackgroundContext';
import { useTranslation } from 'react-i18next';


export default function CounterScreen() {
    const { count, increment, decrement, reset } = useCounter(0);
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const isDark = theme === 'dark';
    const { fontSize } = useContext(FontSizeContext);
    const { textColor, applyEverywhere } = useTextColor();
    const { background } = useBackground();

    const images = {
        bg1: require('../../assets/images/bg1.jpg'),
        bg2: require('../../assets/images/bg2.jpg'),
        bg3: require('../../assets/images/bg3.jpg'),
    };

    const fallbackColor = isDark ? '#ffffff' : '#111111';

    return (
        <ImageBackground source={images[background]} style={styles.background}>
            <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
                <Text style={[styles.value, { fontSize, color: applyEverywhere ? textColor : fallbackColor }]}>
                    {t('Compteur')} : {count}
                </Text>

                <View style={styles.row} >
                    <Button title="+1" onPress={increment} />
                    <View style={{ width: 12 }} />
                    <Button title="-1" onPress={decrement} />
                    <View style={{ width: 12 }} />
                    <Button title={t('Reset')} onPress={reset} />
                </View>

            </View>
        </ImageBackground>
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
        color: '#111111'
    },
    dark: {
        color: '#ffffff'
    },
    background: {
        flex: 1, resizeMode: 'cover'
    }
});
