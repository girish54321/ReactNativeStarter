import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
import { Route } from '../../constants/Route';
import SettingsScreen from '../../screens/SettingsScreen/SettingsScreen';

const SettingStack = createNativeStackNavigator();

const TheHeader = (props: any) => {
    return (
        <CustomNavigationBar {...props} />
    )
}

export const SettingScreenStack = () => {
    const { t } = useTranslation();
    return (
        <SettingStack.Navigator
            screenOptions={{
                title: t('settings'),
                header: TheHeader
            }}
        >
            <SettingStack.Screen name={Route.SETTINGS} component={SettingsScreen} />
        </SettingStack.Navigator>
    );
};
