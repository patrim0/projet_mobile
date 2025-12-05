import 'react-native-gesture-handler';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AnimatedButton from './src/components/AnimatedButton';
import { findCountries } from "./src/api/countries";
import i18nextConfig from './src/i18n/i18nextConfig';


export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
  }, []);

  useEffect(() => {
  (async () => {
    const result = await findCountries("ca");
    console.log("TEST API:", result);
  })();
}, []);


  
    return (
        <AppNavigator />
    );
}
