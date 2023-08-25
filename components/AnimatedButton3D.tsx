import Animated, { Easing, interpolateColor, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

type AnimatedButtonProps = {
    onPressIn: () => void;
    onPressOut: () => void;
    disabled: boolean;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton3D: React.FC<AnimatedButtonProps> = ({ onPressIn, onPressOut, disabled }) => {
    const scale = useSharedValue(1);
    const shadowOpacity = useSharedValue(0);
    const bgColor = useSharedValue(0); // Using a numeric value for interpolation

    const handlePressIn = () => {
        scale.value = withSpring(0.9, { damping: 2, stiffness: 120 });
        shadowOpacity.value = withTiming(0.1, { duration: 150 });
        bgColor.value = withTiming(1, { duration: 150 }); // Using a numeric value for interpolation
        onPressIn();
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 100 });
        shadowOpacity.value = withTiming(0, { duration: 150 });
        bgColor.value = withTiming(0, { duration: 150 }); // Using a numeric value for interpolation
        onPressOut();
    };

    const animatedStyle = useDerivedValue(() => {
        return {
            transform: [{ scale: scale.value }],
            shadowOpacity: shadowOpacity.value,
            backgroundColor: interpolateColor(
                bgColor.value,
                [0, 1],
                ['#FF5252', '#D32F2F'] // Original red to darker red
            ),
        };
    });

    return (
        <AnimatedTouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 100, height: 100 },
                shadowOpacity: animatedStyle.value.shadowOpacity,
                shadowRadius: 10,
                elevation: 10,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 10,
                marginBottom: 10,
                borderWidth: 4,
                borderColor: '#990000',
                backgroundColor: animatedStyle.value.backgroundColor,
                transform: [{ scale: animatedStyle.value.transform[0].scale }],
            }}
            disabled={disabled}
        >
            <View style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateY: 0 }],
            }}>
                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
                    Botão 3D
                </Text>
            </View>
        </AnimatedTouchableOpacity>
    );
};

export default AnimatedButton3D;
