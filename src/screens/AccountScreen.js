import { useContext, useEffect, useState } from "react";
import { StatusBar, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from "../context/AuthContext";
import { getUserInfo, editUserInfo } from "../api/auth";

export default function AccountScreen() {

    const { token, setToken, setUsername } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!token) return;

        async function load() {
            const data = await getUserInfo(token);
            setProfile(data);
        }

        load();
    }, [token]);


    async function handleEdit() {
        setError(false);
        setSuccess(false);

        const updates = {
            email: profile.email,
            username: profile.username,
            firstName: profile.firstName,
            lastName: profile.lastName,
        };

        const { success: ok, user, token: newToken } = await editUserInfo(token, updates);
        setToken(newToken);

        if (!ok) {
            setError(true);
            return;
        }

        setProfile({ ...user })

        setUsername(user.username);
        setSuccess(true);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={'dark-content'} />

                <Text style={styles.header}>Edit Profile</Text>

                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>

                    <View style={{ marginBottom: 18 }}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={profile?.email ?? ""}
                            onChangeText={(txt) => setProfile({ ...profile, email: txt })}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={{ marginBottom: 18 }}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={profile?.username ?? ""}
                            onChangeText={(txt) => setProfile({ ...profile, username: txt })}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={{ marginBottom: 18 }}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            value={profile?.firstName ?? ""}
                            onChangeText={(txt) => setProfile({ ...profile, firstName: txt })}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={{ marginBottom: 18 }}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            value={profile?.lastName ?? ""}
                            onChangeText={(txt) => setProfile({ ...profile, lastName: txt })}
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>

                    {success && <Text style={styles.success}>Changes saved.</Text>}
                    {error && <Text style={styles.error}>Update failed.</Text>}

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5EEF9",
    },
    header: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 20,
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 20,
    },
    label: {
        fontSize: 12,
        color: "#673AB7",
        marginBottom: 6,
        paddingLeft: 6,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#673AB7",
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 15,
    },
    button: {
        backgroundColor: "#673AB7",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 15,
    },
    success: {
        color: "#4CAF50",
        textAlign: "center",
        marginTop: 12,
    },
    error: {
        color: "#ff3b30",
        textAlign: "center",
        marginTop: 12,
    },
});