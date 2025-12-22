import 'react-native-gesture-handler';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import AnimatedButton from './src/components/AnimatedButton';
import { findCountries } from "./src/api/countries";

export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
    }, []);

/*     useEffect(() => {
        (async () => {
            const result = await findCountries("ca");
            console.log("TEST API:", result);
        })();
    }, []); */

    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
