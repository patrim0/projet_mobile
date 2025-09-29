import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { FontSizeProvider } from './src/context/FontSizeContext';
import { BackgroundProvider } from './src/context/BackgroundContext';
import AppNavigator from './src/navigation/AppNavigator';
import { TextColorProvider } from './src/context/ColorContext';

export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
    }, []);
  
    return (
        <ThemeProvider>
            <FontSizeProvider>
                <TextColorProvider>
                <BackgroundProvider>
                <AppNavigator />
                </BackgroundProvider>
                </TextColorProvider>
            </FontSizeProvider>
        </ThemeProvider>
    );
}
