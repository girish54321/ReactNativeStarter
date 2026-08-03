import * as React from 'react';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import AppLoaderModal from '../../components/appLoaderModal/AppLoaderModal';
import { Route } from '../../constants/Route';
import { useTranslation } from 'react-i18next';
import { HomeScreenStack } from '../HomeStack/HomeStack';
import { UsersListStack } from '../UsersListStack/UsersListStack';
import { SettingScreenStack } from '../SettingScreenStack/SettingScreenStack';

const Tab = createNativeBottomTabNavigator();

export default function AppBottomTab() {
    const { t } = useTranslation();

    return (
        <>
            <AppLoaderModal />
            <Tab.Navigator>
                <Tab.Screen
                    name={Route.APPSTACK}
                    component={HomeScreenStack}
                    options={{
                        tabBarLabel: t('home'),
                        tabBarIcon: () => ({ sfSymbol: 'house' }),
                        lazy:true,
                    }}
                />
                <Tab.Screen
                    name={Route.USERSCREEN_TAB}
                    component={UsersListStack}
                    options={{
                        tabBarLabel: t('users'),
                        tabBarIcon: () => ({ sfSymbol: 'list.dash' }),
                        lazy:true,
                    }}
                />
                <Tab.Screen
                    name={Route.SETTINGS_TAB}
                    component={SettingScreenStack}
                    options={{
                        tabBarLabel: t('settings'),
                        tabBarIcon: () => ({ sfSymbol: 'gear' }),
                        lazy:true,
                    }}
                />
            </Tab.Navigator>
        </>
    );
}