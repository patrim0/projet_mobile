import { useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput } from 'react-native';

export default function RightMenu({ visible, onClose, width = 260 }) {

    const [view, setView] = useState('guest');

    const translateX = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: visible ? 0 : width,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start();
    }, [visible]);

    return (
        <View style={[styles.overlay, { display: visible ? 'flex' : 'none' }]}>

            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.sidebar, { width, transform: [{ translateX }] }]}>

                {view === 'guest' && (
                    <>
                        <Text style={styles.header}>Launch yourself towards your next destination</Text>
                        <Text style={styles.subHeader}>Save and customize your preferences.</Text>

                        <View style={styles.separator} />

                        <TouchableOpacity onPress={() => setView('login')}>
                            <Text style={styles.menuItem}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setView('register')}>
                            <Text style={styles.menuItem}>Sign Up</Text>
                        </TouchableOpacity>
                    </>
                )}

                {view === 'login' && (
                    <>
                        <Text style={styles.header}>Welcome Back</Text>

                        <View style={styles.separator} />

                        <TextInput style={styles.input} placeholder="Email" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry />

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />

                        <Text style={[styles.lostPassword]}>Lost Password?</Text>
                    </>
                )}

                {view === 'register' && (
                    <>
                        <Text style={styles.header}>Create Account</Text>

                        <View style={styles.separator} />

                        <TextInput style={styles.input} placeholder="Email" />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry /> 
                        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>
                    </>
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
        backgroundColor: 'rgba(0,0,0,0.3)',
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
        paddingVertical: 25,
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