import NativeBuildEnv from "../../specs/NativeBuildEnv";

const BUILD_ENV = NativeBuildEnv.getBuildType(); 
const BASE_URL = NativeBuildEnv.getBaseUrl(); 

export function getBaseUrl() {
    return BASE_URL;
}

export function getEnvironmentVariable() {
    return BUILD_ENV === 'DEV' ? true : false;
} 

export function getDefaultHeader() {
    return {
        // 'x-api-key': 'reqres-free-v1',
        'x-api-key': 'reqres_d9c8a80778ae496896efc74d8436b128',
    };
}
