import React from 'react';
import { FlatList, GestureResponderEvent, StyleSheet } from 'react-native';
import { AppView } from '../../components/Flex/Flex';
import { ListItem } from '../../components/ListItem/ListItem';
import { navigate } from '../../navigation/NavigationService';
import { Route } from '../../constants/Route';
import { useUserList } from '../../Network/Querys/useUserListQuery';
import LoadingView from '../../components/loadingView';
import { ActivityIndicator, IconButton, } from 'react-native-paper';
import getTestId from '../../Config/helper';
import { ErrorView } from '../../components/errorView/ErrorView';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const AnimatedListItemView = Animated.createAnimatedComponent(ListItem);

export const UsersScreen = (_props: any) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useUserList();

    if (isError) {
        return (
            <ErrorView
                title='Error'
                message={error?.message ?? "Error fetching data"}
                onRetry={refetch}
            />
        );
    }

    if (isLoading) {
        return (
            <AppView>
                <LoadingView testID={getTestId('user-list-loading')} />
            </AppView>
        );
    }

    return (
        <AppView>
            <FlatList
                refreshing={isLoading}
                // eslint-disable-next-line react/no-unstable-nested-components
                ListFooterComponent={() => isFetchingNextPage ? <ActivityIndicator /> : null}
                data={data?.pages.map(page => page.data.data).flat()}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
                keyExtractor={(item, index) => `${index}${item.first_name}`}
                renderItem={({ item }) => {
                    return (
                        <Swipeable
                            renderLeftActions={(valIcon) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const iconStyle = useAnimatedStyle(() => ({
                                    transform: [{ scale: interpolate(valIcon.value, [0, 1], [0.5, 1]) }],
                                }));
                                return (
                                    <Animated.View style={[styles.actionButtonView, iconStyle]}>
                                        <IconButton
                                            icon="bookmark"
                                            style={styles.actionButtonIcon}
                                            mode='contained-tonal'
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </Animated.View>
                                )
                            }}
                            renderRightActions={(valIcon) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const iconStyle = useAnimatedStyle(() => ({
                                    transform: [{ scale: interpolate(valIcon.value, [0, 1], [0.5, 1]) }],
                                }));
                                return (
                                    <Animated.View style={[styles.actionButtonView, iconStyle]}>
                                        <IconButton
                                            icon="delete"
                                            style={styles.actionButtonIcon}
                                            mode='contained-tonal'
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </Animated.View>
                                )
                            }}
                        >
                            <AnimatedListItemView
                                name={`${item.first_name} ${item.last_name}`}
                                email={item.email}
                                key={String(1)}
                                image={item.avatar}
                                onPress={function (_e: GestureResponderEvent): void {
                                    navigate(Route.SELECTEDUSERSCREEN, { data: item });
                                }}
                            />
                        </Swipeable>
                    );
                }}
            />
        </AppView>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        marginHorizontal: 12,
    },
    actionButtonView: {
        width: 74, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
    },
    actionButtonIcon: {
        width: 45, height: 45
    }
})
