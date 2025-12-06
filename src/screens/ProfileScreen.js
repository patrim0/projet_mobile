import { useContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from "../context/AuthContext";
import { getUserInfo } from "../api/auth";

export default function ProfileScreen() {

    const { token } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!token) return;

        async function load() {
            const data = await getUserInfo(token);
            setProfile(data);
        }

        load();
    }, [token]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={'dark-content'} />
                <Text>Username: {profile?.username}</Text>
                <Text>Email: {profile?.email}</Text>
                <Text>Full Name: {profile?.firstName} {profile?.lastName}</Text>
                <Text>Favorite Countries: {profile?.favoriteCountries?.join(', ')}</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    topBar: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
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