import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Slider } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { FontSizeContext } from '../context/FontSizeContext';
import { useBackground } from '../context/BackgroundContext';
/*import { backgroundColorContext } from '../context/backgroundColorContext';*/
import { useTextColor } from '../context/ColorContext';

export default function SettingsScreen() {
    
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);

    /* const themeText = (theme === 'dark' ? t('ModeSombre') : t('ModeClair'));
    
    return (
        <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
            <Text style={[styles.title, theme === 'dark' ? styles.dark : styles.light]}>{t('Parametres')}</Text>

            <View style={styles.row}>
                <Text style={theme === 'dark' ? styles.dark : styles.light}>{themeText}</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            
            <View style={{ height: 20 }} />

            <Button title={t('Francais')} onPress={() => i18n.changeLanguage('fr')}/>

            <View style={{ height: 20 }} />

            <Button title={t('Anglais')} onPress={() => i18n.changeLanguage('en')}/>
        </View>
    ); */

    const isDark = theme === 'dark';
    const { fontSize, setFontSize } = useContext(FontSizeContext);
    const { background, setBackground } = useBackground();
    /*const {backgroundColor, setBackgroundColor} = useContext(backgroundColorContext);*/
    const { textColor, setTextColor, applyEverywhere, setApplyEverywhere } = useTextColor();
    const [previewColor, setPreviewColor] = useState(textColor);
  
    const themeText = theme === 'dark' ? "Mode sombre" : "Mode clair"; 

      const images = {
        bg1: require('../../assets/images/bg1.jpg'),
        bg2: require('../../assets/images/bg2.jpg'),
        bg3: require('../../assets/images/bg3.jpg'),
      };
  
      const COLORS = [
        { name: 'Noir', value: '#111111' },
        { name: 'Bleu', value: '#1e40af' },
        { name: 'Rouge', value: '#b91c1c' },
      ];

    return (
      <View style={[styles.container, isDark ? styles.dark : styles.light]}>
      <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
        <View style={styles.row}>
          <Text style={{ color: textColor }}>{themeText}</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <View style={styles.sliderContainer}>
      <Text style={{ color: textColor, fontSize: 12 }}>A</Text>


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
        <Text style={{ color: textColor, fontSize: 24 }}>A</Text>
      </View>

      <Text

  style={{ color: textColor, fontSize: fontSize, marginTop: 16 }}>Aperçu de la taille du texte</Text>
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {COLORS.map((c) => {
          const selected = previewColor.toLowerCase() === c.value.toLowerCase();
          return (
            <TouchableOpacity
              key={c.value}
              onPress={() => setPreviewColor(c.value)}  
              style={{
                width: 28, height: 28, borderRadius: 14,
                backgroundColor: c.value,
                borderWidth: selected ? 3 : 1,
                borderColor: selected ? '#444' : '#ccc',
                marginRight: 12,
              }}
              
            />
          );
        })}
        
      </View>


      <Text style={{ color: previewColor, fontSize, marginTop: 12 }}>
        Exemple avec la couleur sélectionnée
      </Text>


     <View style={[styles.row, { marginTop: 12 }]}>
        <Text style={{ color: textColor }}>Appliquer partout</Text>
        <Switch
          value={applyEverywhere}
          onValueChange={(val) => {
            setApplyEverywhere(val);
            if (val) setTextColor(previewColor);
          }}
        />
      <Text
        style={{ color: theme === 'dark' ? '#fff' : '#111', fontSize: fontSize, marginTop: 16 }}>Aperçu de la taille du texte
      </Text>
      </View>

      <View style={styles.container}>
      <Text style={{color: theme === 'dark' ? '#fff' : '#111', fontSize: fontSize, marginTop: 16}}>Choose Background</Text>
      <Picker
        selectedValue={background}
        onValueChange={(value) => setBackground(value)}
        style={styles.picker}
      >
        <Picker.Item label="Background 1" value="bg1" color={theme === 'dark' ? '#fff' : '#111'}/>
        <Picker.Item label="Background 2" value="bg2" color={theme === 'dark' ? '#fff' : '#111'}/>
        <Picker.Item label="Background 3" value="bg3" color={theme === 'dark' ? '#fff' : '#111'}/>
      </Picker>
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
        marginVertical: 20
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
