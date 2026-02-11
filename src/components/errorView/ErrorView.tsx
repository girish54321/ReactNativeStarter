import React, { useEffect } from 'react';
import { AppView } from '../../components/Flex/Flex';
import { Text, Avatar, Button } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withDelay, withSpring } from 'react-native-reanimated';
import SizedBox from '../../components/SizedBox';
import { StyleSheet } from 'react-native';

interface ErrorViewProps {
    title: string,
    message?: string;
    onRetry?: () => void;
}

export const ErrorView = ({
    title,
    message,
    onRetry
}: ErrorViewProps) => {
    const val = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(val.value, [0, 1], [0.5, 1.2]) }],
    }));

    useEffect(() => {
        val.value = withDelay(500, withSpring(1));
    }, [])

    return (
        <AppView paddingRequired justifyContent="center" alignItems="center">
            <Animated.View style={[styles.box, animatedStyle]} >
                <Avatar.Icon size={62} icon="bug" />
            </Animated.View>
            <SizedBox size={14} />
            <Text variant="headlineLarge">{title}</Text>
            <SizedBox size={12} />
            <Text variant="titleLarge">{message}</Text>
            <SizedBox size={14} />
            <Button mode="elevated" onPress={onRetry}>
                Try Again
            </Button>
        </AppView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});