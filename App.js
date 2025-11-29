import 'react-native-gesture-handler';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
  }, []);

    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
