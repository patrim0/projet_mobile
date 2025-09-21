import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { FontSizeProvider } from './src/context/FontSizeContext';  
import AppNavigator from './src/navigation/AppNavigator';
import { TextColorProvider } from './src/context/ColorContext';

export default function App() {
    return (
        <ThemeProvider>
            <FontSizeProvider>
                <TextColorProvider>
                <AppNavigator />
                </TextColorProvider>
            </FontSizeProvider>
        </ThemeProvider>
    );
}
