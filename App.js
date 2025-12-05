import 'react-native-gesture-handler';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AnimatedButton from './src/components/AnimatedButton';

export default function App() {

    const init = async () => {
        i18nextConfig.initalizeI18Next();
    };

    useEffect(() => {
        init();
  }, []);

  
    return (
        <AppNavigator />
    );
}
