import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

export default function LeftMenu({ visible, onClose, width = 260 }) {

    const translateX = useRef(new Animated.Value(-width)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: visible ? 0 : -width,
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

    return (
        <View style={[styles.overlay, { pointerEvents: visible ? 'auto' : 'none' }]}>

            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.sidebar, { width, transform: [{ translateX }] }]}>
                <Text style={styles.header}>Menu</Text>
                <View style={styles.separator} />

                <Text style={styles.menuItem}>Countries</Text>
                <Text style={styles.menuItem}>Exchange Rates</Text>

                <View style={{ flex: 1 }} />
                
                <Text style={styles.menuItem}>Language</Text>
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
        left: 0,
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
    },
    separator: {
        height: 2,
        backgroundColor: '#ddd',
        marginBottom: 25,
    },
    menuItem: {
        fontSize: 15,
        marginBottom: 25,
        color: '#222',
    },
});