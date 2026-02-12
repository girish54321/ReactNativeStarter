import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
import { Route } from '../../constants/Route';
import { UsersScreen } from '../../screens/UsersScreen/UsersScreen';
import { SelectedUserScreen } from '../../screens/UsersScreen/SelectedUser';

const UserStack = createNativeStackNavigator();

const TheHeader = (props: any) => {
    return (
        <CustomNavigationBar {...props} />
    )
}

export const UsersListStack = () => {
    const { t } = useTranslation();
    return (
        <UserStack.Navigator
            screenOptions={{
                title: t('users'),
                header: TheHeader
            }}
        >
            <UserStack.Screen name={Route.USERSCREEN} component={UsersScreen} />
            <UserStack.Screen name={Route.SELECTEDUSERSCREEN} component={SelectedUserScreen} />
        </UserStack.Navigator>
    );
};
