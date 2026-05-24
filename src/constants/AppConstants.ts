import { NativeModules } from 'react-native';
const Flavor = NativeModules.RNConfigModule; 

export function getBaseUrl() {
    // return Flavor.BASE_URL;
    return 'https://reqres.in/api/';
}

export function getEnvironmentVariable() {
    return Flavor.BUILD_ENV === 'DEV' ? true : false;
}

export function getDefaultHeader() {
    return {
        // 'x-api-key': 'reqres-free-v1',
        'x-api-key': 'reqres_d9c8a80778ae496896efc74d8436b128',
    };
}
