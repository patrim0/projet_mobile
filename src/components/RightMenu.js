import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState, useContext } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RightMenu({ visible, onClose, width = 260 }) {

    const [view, setView] = useState('guest');
    
    const [inputError, setInputError] = useState(false);
    const [username, inputUsername] = useState("");
    const [password, inputPassword] = useState("");
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

    const translateX = useRef(new Animated.Value(width)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const fadeOut = useRef(new Animated.Value(0)).current;
    const fadeIn = useRef(new Animated.Value(1)).current;
    const shake = useRef(new Animated.Value(0)).current;
    const errorMessage = useRef(new Animated.Value(0)).current;

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
        resetTextInputVisuals();
        resetTextInputValues();

        if (next === 'guest') {
            Animated.timing(fadeIn, {
                toValue: 0,        
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                resetTextInputVisuals();
                resetTextInputValues();
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
        if (!visible && !isLoggedIn) setView('guest');
        fadeOut.setValue(0);
    }, [visible]);

    function shakeError() {
        Animated.sequence([
            Animated.timing(shake, { toValue: 10, duration: 80, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -10, duration: 80, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -4, duration: 60, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
        loginError();
    }

    function loginError() {
        Animated.timing(errorMessage, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    function resetTextInputValues() {
        inputUsername("");
        inputPassword("");
    }

    function resetTextInputVisuals() {
        setInputError(false);
        errorMessage.setValue(0);
    }
    
    // Fonction temporaire pour trigger le visuel d'erreur, on va changer ça quand on aura le backend
    function handleLogin(email, password) {
        if (email === 'toto@tata.com' && password === 'titi') {
            setLoggedIn(true);
            resetTextInputVisuals();
            switchView("loggedin");
            resetTextInputValues();
            return;
        }
        setInputError(true);
        shakeError();
    }

    return (
        <View style={[styles.overlay, { pointerEvents: visible ? 'auto' : 'none' }]}>

            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.sidebar, { width, transform: [{ translateX }] }]}>

                {view === 'guest' && (
                    <Animated.View style={{
                        opacity: fadeOut.interpolate({inputRange: [0,1], outputRange: [1,0]}),
                        transform:[{translateY: fadeOut.interpolate({inputRange: [0,1], outputRange: [0,15]})}]
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
                    <Animated.View style={{opacity: fadeIn, transform: [{ translateY: fadeIn.interpolate({ inputRange:[0,1], outputRange:[15,0] }) }, { translateX: shake }], flex: 1}}>
                        <Text style={styles.header}>Welcome Back</Text>

                        <View style={styles.separator} />

                        <Animated.View>
                            <TextInput style={[styles.input, inputError && { borderColor: "#ff3b30" }]} placeholder="Username" value={username} onChangeText={inputUsername} autoCapitalize='none' autoCorrect={false} />
                            <TextInput style={[styles.input, inputError && { borderColor: "#ff3b30" }]} placeholder="Password" secureTextEntry value={password} onChangeText={inputPassword} autoCapitalize='none' autoCorrect={false}/>
                        </Animated.View>

                        <TouchableOpacity onPress={() =>  handleLogin(username, password)} style={styles.loginButton} >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>

                        {inputError && (
                            <Animated.Text
                                style={{
                                    color: "#ff3b30",
                                    textAlign: "center",
                                    marginTop: 12,
                                    opacity: errorMessage
                                }}
                            >
                                Invalid username or password
                            </Animated.Text>
                        )}

                        <TouchableOpacity onPress={() => switchView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={() => switchView('lostPassword')}>
                            <Text style={[styles.lostPassword]}>Lost Password?</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {view === 'register' && (
                    <Animated.View style={{opacity: fadeIn, transform: [{ translateY: fadeIn.interpolate({ inputRange:[0,1], outputRange:[15,0] }) }]}}>
                        <Text style={styles.header}>Create Account</Text>

                        <View style={styles.separator} />

                        <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' autoCorrect={false}/>
                        <TextInput style={styles.input} placeholder="Username" autoCapitalize='none' autoCorrect={false}/>
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize='none' autoCorrect={false}/> 
                        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry autoCapitalize='none' autoCorrect={false}/>

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => switchView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {view === 'loggedin' && isLoggedIn && (
                    <Animated.View style={{
                        flex: 1,
                        opacity: fadeOut.interpolate({inputRange: [0,1], outputRange: [1,0]}),
                        transform:[{translateY: fadeOut.interpolate({inputRange: [0,1], outputRange: [15,0]})}]
                    }}>
                        <Text style={styles.loggedInHeader}>{"Toto"}</Text>

                        <View style={styles.separator} />

                        <Text style={styles.loggedInItem}>Account</Text>
                        <Text style={styles.loggedInItem}>Profile</Text>
                        <Text style={styles.loggedInItem}>Preferences</Text>

                        <View style={{ flex: 1 }} />

                        <TouchableOpacity onPress={() => {setLoggedIn(false); setView('guest');} }>
                            <Text style={[styles.signOut, { marginTop: 20 }]}>Sign Out</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {view === 'lostPassword' && (
                    <Animated.View style={{
                        flex: 1,
                        opacity: fadeOut.interpolate({inputRange: [0,1], outputRange: [1,0]}),
                        transform:[{translateY: fadeOut.interpolate({inputRange: [0,1], outputRange: [15,0]})}]
                    }}>
                        <Text style={styles.header}>Forgot your password?</Text>

                        <View style={styles.separator} />

                        <Text style={styles.menuItem}>Enter your email to receive a link to reset your password</Text>

                        <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' autoCorrect={false}/>

                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Submit Request</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => switchView('guest')}>
                            <Text style={[styles.backButton, { marginTop: 20 }]}>← Back</Text>
                        </TouchableOpacity>
                        
                        <View style={{ flex: 1 }} />
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
    loggedInItem: {
        fontSize: 15,
        paddingVertical: 25,
        textAlign: 'right',
    },
    loggedInHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'right',
    },
    signOut: {
        fontSize: 15,
        paddingVertical: 75,
        textAlign: 'right',
    },
});