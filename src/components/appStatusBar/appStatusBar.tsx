
import React from 'react';
import { StatusBar } from 'react-native';
interface AppStatusBarType {
    isDarkTheme: boolean,
}
export default function AppStatusBar(props: AppStatusBarType) {
    const { isDarkTheme } = props;
    return (
        <StatusBar
            barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
            hidden={false}
            translucent={true}
        />
    );
}
