import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { getUserInfo } from "../api/auth";
import NavigationUI from "../components/NavigationUI";

export default function ProfileScreen({ parallax }) {

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
        <NavigationUI title={`${profile?.username}'s Profile`} parallax={parallax}>
            <Text style={styles.screenTitle}></Text>

            <View style={styles.card}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>{profile?.username}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profile?.email}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.value}>
                    {profile?.firstName} {profile?.lastName}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Favorite Countries</Text>

                <View style={styles.chips}>
                    {profile?.favoriteCountries?.map((c, index) => (
                        <Text key={index} style={styles.chip}>
                            {c}
                        </Text>
                    ))}
                </View>
            </View>
        </NavigationUI>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5EEF9",
        padding: 20
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
        color: "#673AB7"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    label: {
        fontSize: 12,
        color: "#673AB7",
        marginBottom: 4
    },
    value: {
        fontSize: 15,
        color: "#222"
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 6
    },
    chip: {
        backgroundColor: "#673AB7",
        color: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 13
    }
});