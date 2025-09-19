import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    );
}
