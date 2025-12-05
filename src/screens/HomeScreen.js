import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Button, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import RightMenu from '../components/RightMenu';
import LeftMenu from '../components/LeftMenu';
import AnimatedButton from '../components/AnimatedButton';

export default function HomeScreen() {

    const { t } = useTranslation();
    const [openRight, setOpenRight] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);

    const [search, setSearch] = useState("");

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={'dark-content'}/>

                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setOpenLeft(true)}>
                        <Feather name="menu" size={24} />
                    </TouchableOpacity>

                    <Text style={styles.title}>WorldInfo</Text>

                    <TouchableOpacity onPress={() => setOpenRight(true)}>
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

                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <AnimatedButton
                        title={"Voir les pays"}
                        onPress={() => "Diego"}
                    />
                </View>

                <RightMenu visible={openRight} onClose={() => setOpenRight(false)}>
                    <Text style={{ fontSize: 22, margin: 20, textAlign: 'right' }}>Sidebar Menu</Text>
                    <Button title="Close" onPress={() => setOpenRight(false)} />
                </RightMenu>
                
                <LeftMenu visible={openLeft} onClose={() => setOpenLeft(false)}>
                    <Text style={{ fontSize: 22, margin: 20, textAlign: 'left' }}>Sidebar Menu</Text>
                    <Button title="Close" onPress={() => setOpenLeft(false)} />
                </LeftMenu>

            </SafeAreaView>
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
