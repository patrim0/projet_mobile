import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function RightMenu({ visible, onClose, width = 260 }) {

    const [view, setView] = useState('guest');

    const translateX = useRef(new Animated.Value(width)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const fadeOut = useRef(new Animated.Value(0)).current;
    const fadeIn = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: visible ? 0 : width,
                speed: 14,
                bounciness: 4,
                useNativeDriver: true,
            })
        ]).start();

        Animated.timing(backdropOpacity, {
            toValue: visible ? 1 : 0,
            duration: 250,
            useNativeDriver: true
        }).start();
    }, [visible]);

    function switchView(next) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        if (next === 'guest') {
            Animated.timing(fadeIn, {
                toValue: 0,        
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setView('guest');   

                Animated.timing(fadeIn, {
                    toValue: 1,     
                    duration: 260,
                    useNativeDriver: true,
                }).start();
            });
            return;
        }

        Animated.timing(fadeIn, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setView(next);
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 260,
                useNativeDriver: true,
            }).start();
        });
    }

    useEffect(() => {
        if (!visible) setView('guest');
        fadeOut.setValue(0);
    }, [visible]);
    

    return (
        <View style={[styles.overlay, { pointerEvents: visible ? 'auto' : 'none' }]}>

            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.sidebar, { width, transform: [{ translateX }] }]}>

                {view === 'guest' && (
                    <Animated.View style={{
                        opacity: fadeOut.interpolate({
                            inputRange: [0,1],
                            outputRange: [1,0]
                        }),
                        transform:[{
                            translateY: fadeOut.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,15]
                            })
                        }]
                    }}>
                        <Text style={styles.header}>Launch yourself towards your next destination</Text>
                        <Text style={styles.subHeader}>Save and customize your preferences.</Text>

                        <View style={styles.separator} />

                        <TouchableOpacity onPress={() => switchView('login')}>
                            <Text style={styles.menuItem}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => switchView('register')}>
                            <Text style={styles.menuItem}>Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {view === 'login' && (
                    <Animated.View style={{
                        flex: 1,
                        opacity: fadeIn,
                        transform:[{
                            translateY: fadeOut.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,15]
                            })
                        }]
                    }}>
                        <Text style={styles.header}>Welcome Back</Text>

                        <View style={styles.separator} />

                        <TextInput style={styles.input} placeholder="Email" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry />

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => switchView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />

                        <Text style={[styles.lostPassword]}>Lost Password?</Text>
                    </Animated.View>
                )}

                {view === 'register' && (
                    <Animated.View style={{
                        opacity: fadeIn,
                        transform:[{
                            translateY: fadeOut.interpolate({
                                inputRange: [1,2],
                                outputRange: [0,15]
                            })
                        }]
                    }}>
                        <Text style={styles.header}>Create Account</Text>

                        <View style={styles.separator} />

                        <TextInput style={styles.input} placeholder="Email" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry /> 
                        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => switchView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    sidebar: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#F5EEF9',
        height: '100%',
        paddingTop: 50,
        paddingHorizontal: 20,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginBottom: 25,
    },
    menuItem: {
        fontSize: 15,
        paddingVertical: 25,
        textAlign: 'center',
    },
    lostPassword: {
        fontSize: 15,
        opacity: 0.4,
        paddingVertical: 75,
        textAlign: 'right',
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    loginButton: {
        backgroundColor: "#673AB7",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 15,
    },
    backButton: {
        fontSize: 15,
        paddingVertical: 25,
        textAlign: 'right',
    },
});