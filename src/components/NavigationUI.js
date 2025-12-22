import * as Haptics from 'expo-haptics';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import LeftMenu from './sidebars/LeftMenu';
import RightMenu from './sidebars/RightMenu';

export default function NavigationUI({ title, children, parallax }) {

    const [openRight, setOpenRight] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);

    const sideBarParallax = {
        transform: [
            { rotateY: parallax.interpolate({ inputRange: [-1, 0, 1], outputRange: ['25deg', '0deg', '-25deg'] }) },
            { scale: parallax.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.96, 1, 0.96] }) },
        ]
    };

    return (
        <SafeAreaProvider style={styles.page}>
            <Animated.View style={[{ flex: 1 }, sideBarParallax]}>
                <SafeAreaView style={styles.page}>

                    <StatusBar barStyle="dark-content" />

                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => { 
                            setOpenLeft(true); 
                            Animated.spring(parallax, { toValue: -1, speed: 12, bounciness: 6, useNativeDriver: true }).start(); 
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        }}>
                            <Feather name="menu" size={24} />
                        </TouchableOpacity>

                        <Text style={styles.title}>{title}</Text>

                        <TouchableOpacity onPress={() => { 
                            setOpenRight(true); 
                            Animated.spring(parallax, { toValue: 1, speed: 12, bounciness: 6, useNativeDriver: true }).start(); 
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        }}>
                            <Feather name="user" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        {children}
                    </View>
                </SafeAreaView>
            </Animated.View>

            <RightMenu visible={openRight} onClose={() => { setOpenRight(false); Animated.spring(parallax, { toValue: 0, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }} parallax={parallax} />
            <LeftMenu visible={openLeft} onClose={() => { setOpenLeft(false); Animated.spring(parallax, { toValue: 0, speed: 12, bounciness: 6, useNativeDriver: true }).start(); }} parallax={parallax} />

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    page: {
         flex: 1,
         backgroundColor: "#f6f4f8" 
    },
    topBar: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#f6f4f8" 
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#673AB7",
        textAlign: "center"
    },
});