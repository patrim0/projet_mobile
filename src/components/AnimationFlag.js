import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export default function AnimationFlag({ uri }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1200, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-200deg", "200deg"]
  });

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3]
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
        backgroundColor: "#eee",
        marginTop: 20,
        transform: [
          { rotateZ: rotate },
          { translateY: translateY }
        ]
      }}
    />
  );
}
