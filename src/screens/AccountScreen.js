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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <Text style={styles.screenTitle}>Edit Account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile?.email ?? ""}
          onChangeText={(txt) => setProfile({ ...profile, email: txt })}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={profile?.username ?? ""}
          onChangeText={(txt) => setProfile({ ...profile, username: txt })}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={profile?.firstName ?? ""}
          onChangeText={(txt) => setProfile({ ...profile, firstName: txt })}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.card}>
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

    </SafeAreaView>
  </SafeAreaProvider>
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
    marginBottom: 6
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#673AB7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15
  },
  button: {
    backgroundColor: "#673AB7",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 15
  },
  success: {
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 12
  },
  error: {
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 12
  }
});