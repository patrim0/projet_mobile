import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { FontSizeProvider } from './src/context/FontSizeContext';  
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <ThemeProvider>
            <FontSizeProvider>
                <AppNavigator />
            </FontSizeProvider>
        </ThemeProvider>
    );
}
