import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  MD3LightTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

export const Colors = {
  white: '#FFFFFF',
  gray: '#bdc3c7',
  primary: '#9932CC',
  primaryDark: '#4cafa0',
  backgroundColor: '#333333',
  loadingColor: '#DCDCDC',
};
export const APP_CONST = {
  CHECK_THEME: 'CHECK_THEME',
  USER_LOGIN: 'USER_LOGIN',
  APP_LANG: "APP_LANG"
};

export const CUSOM_DEFUALT_THEM = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    accent: Colors.primary,
    primary: Colors.primary,
    card: 'rgb(255, 255, 255)',
    text: '#000000',
  },
};

export const CUSOM_DARK_THEM = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    accent: Colors.primary,
    primary: Colors.primary,
    card: 'rgb(18, 18, 18)',
    background: '#000000',
    text: '#ffffff',
  },
};