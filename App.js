import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { FontSizeProvider } from './src/context/FontSizeContext';
import { BackgroundProvider } from './src/context/BackgroundContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
            <ThemeProvider>
                <FontSizeProvider>
                    <BackgroundProvider>
                       <AppNavigator /> 
                    </BackgroundProvider>
                </FontSizeProvider>
            </ThemeProvider>
    );
}
