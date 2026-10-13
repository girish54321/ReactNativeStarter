import React, { FC, useEffect } from 'react';
import {
    NavigationContainer,
} from '@react-navigation/native';
import {
    Provider as PaperProvider,
} from 'react-native-paper';
import { appStorageMMKV } from '../App';
import { setTopLevelNavigator } from './NavigationService';
import { AppBottomTab } from './appNavigation/AppNavigation';
import AuthStackScreens from './authStack/AuthStackScreens';
import { DARK_THEME_TYPE } from '../redux/themeStore/reducers';
import { checkTheme } from '../redux/themeStore/action';
import { authSlice } from '../redux/authStore/authReducers';
import LoadingView from '../components/loadingView';
import AppStatusBar from '../components/appStatusBar/appStatusBar';
import { APP_CONST, CUSOM_DARK_THEM, CUSOM_DEFUALT_THEM } from '../Config/Colors';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { appSlice } from '../redux/appStore/AppReducers';
import { useTranslation } from 'react-i18next';

export const Navigation: FC = () => {
    const data: DARK_THEME_TYPE = useAppSelector((state: any) => state.themeReducer);

    const authDispatch = useAppDispatch();
    const authState = useAppSelector((state: any) => state.authReducer);
    const { i18n } = useTranslation();

    useEffect(() => {
        //@ts-ignore
        authDispatch(checkTheme());
        checkIfLoggedIn();
        checkAppLang();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIfLoggedIn = () => {
        const logedInUser = appStorageMMKV.getString(APP_CONST.USER_LOGIN)
        if (!logedInUser) {
            authDispatch(authSlice.actions.checkUserLoginAction(null));
            return
        }
        let jsonData = JSON.parse(logedInUser);
        authDispatch(authSlice.actions.checkUserLoginAction(jsonData));
    };

    const checkAppLang = () => {
        const appLang = appStorageMMKV.getString(APP_CONST.APP_LANG)

        if (!appLang) {
            authDispatch && authDispatch(appSlice.actions.setAppLan('en'));
            i18n.changeLanguage('en');
            return
        }

        authDispatch && authDispatch(appSlice.actions.setAppLan(appLang));
        i18n.changeLanguage(appLang);
    }



    if (authState.isLoading) {
        return <LoadingView />;
    }

    return (
        <PaperProvider
            theme={{
                colors: data.isDarkTheme ? CUSOM_DARK_THEM.colors : CUSOM_DEFUALT_THEM.colors,
            }}
        >
            <AppStatusBar isDarkTheme={data.isDarkTheme} />
            <NavigationContainer
                ref={(navigatorRef: any) => {
                    setTopLevelNavigator(navigatorRef);
                }}
                theme={data.isDarkTheme ? CUSOM_DARK_THEM : CUSOM_DEFUALT_THEM}
            >
                {authState.userLoggedIn ? (
                    <AppBottomTab />
                ) : (
                    <AuthStackScreens />
                )}
            </NavigationContainer>
        </PaperProvider>
    );
};
