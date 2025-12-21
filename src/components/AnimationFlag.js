import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export default function AnimationFlag({ uri }) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);

    const rotateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["15deg", "-15deg"]
    });

    return (
        <Animated.Image
            source={{ uri }}
            resizeMode="contain"
            style={{
                width: 250,
                height: 150,
                borderRadius: 12,
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "#eee",
                transform: [
                    { perspective: 500 },
                    { rotateY }
                ]
            }}
        />
    );
}