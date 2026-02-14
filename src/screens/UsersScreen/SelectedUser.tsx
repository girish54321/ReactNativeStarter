import { Avatar, Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppView } from '../../components/Flex/Flex';
import { scale } from '../../Config/ScalingUtils';
import { UserList } from '../../models/responseType/UserListResponse';
import { useRoute, useNavigation } from '@react-navigation/native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';

const AvatarAnimated = Animated.createAnimatedComponent(Avatar.Image);

export const SelectedUserScreen = () => {
    const val = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(val.value, [0, 1], [0.5, 1]) }],
    }));

    //@ts-ignore
    const data: UserList = useRoute().params?.data;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: `${data.first_name} ${data.last_name}` });
        val.value = withDelay(150, withSpring(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppView paddingRequired>
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileView}>
                    <AvatarAnimated
                        size={scale(90)}
                        source={{ uri: data?.avatar }}
                        style={animatedStyle}
                    />
                    <Text variant="headlineLarge">{data.first_name} {data.last_name}</Text>
                    <Text variant="titleLarge">{data.email}</Text>
                </View>
            </ScrollView>
        </AppView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profileView: {
        justifyContent: 'space-around',
        alignItems: 'center', height: scale(160),
        marginTop: scale(14),
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(16),
    },
});
