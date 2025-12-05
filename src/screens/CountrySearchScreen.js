import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CountrySearchResults from '../components/CountrySearchResults';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';

export default function CountrySearchScreen({ parallax }) {

    const { t } = useTranslation();

    const [openRight, setOpenRight] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);

    const [search, setSearch] = useState("");

    const sideBarParallax = {
        transform: [
            { rotateY: parallax.interpolate({ inputRange: [-1, 0, 1], outputRange: ['25deg', '0deg', '-25deg'] }) },
            { scale: parallax.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.96, 1, 0.96] }) },
        ]
    };

    return (
        <SafeAreaProvider>
            <Animated.View style={[{ flex: 1, backgroundColor: "transparent" }, sideBarParallax]}>
                <SafeAreaView style={{ flex: 1 }}>

                    <StatusBar barStyle={'dark-content'} />

                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => { setOpenLeft(true); Animated.spring(parallax, { toValue: -1, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }}>
                            <Feather name="menu" size={24} />
                        </TouchableOpacity>

                        <Text style={styles.title}>WorldInfo</Text>

                        <TouchableOpacity onPress={() => { setOpenRight(true); Animated.spring(parallax, { toValue: 1, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }}>
                            <Feather name="user" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <Text style={styles.searchLabel}>Search Country</Text>

                        <View style={styles.searchBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                            />

                            {search.length > 0 && (
                                <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                                    <MaterialIcons name="cancel" size={20} color="#673AB7" />
                                </TouchableOpacity>
                            )}
                        </View>


                    </View>

                    <View style={{ flex: 1 }}>
                        {search.length >= 2 && (
                            <CountrySearchResults query={search} />
                        )}
                    </View>
                </SafeAreaView>


            </Animated.View>

            <RightMenu visible={openRight} onClose={() => { setOpenRight(false); Animated.spring(parallax, { toValue: 0, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }} parallax={parallax} />
            <LeftMenu visible={openLeft} onClose={() => { setOpenLeft(false); Animated.spring(parallax, { toValue: 0, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }} parallax={parallax} />

        </SafeAreaProvider>
    );
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
    searchContainer: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    searchLabel: {
        fontSize: 12,
        marginBottom: 6,
        paddingLeft: 10,
        color: '#673AB7',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#673AB7',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    clearButton: {
        padding: 6,
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
