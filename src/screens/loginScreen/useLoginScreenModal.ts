import { useState } from 'react';
import {
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';
import NativeBuildEnv from '../../../specs/NativeBuildEnv';

export const defaultLoginScreenState = {
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
};

const useLoginScreenModal = () => {
    const paperTheme = useTheme();
    const [userData, setuserData] = useState(defaultLoginScreenState);

    const BUILD_ENV = NativeBuildEnv.getBuildType(); 
    const BASE_URL = NativeBuildEnv.getBaseUrl(); 

    const authDispatch = useDispatch();
    const { mutate, isPending } = useUserLogin();

    const saveUserLogin = async () => {
        let postData = {
            // email: 'eve.holt@reqres.in',
            // password: 'cityslicka',
            email: '',
            password: '',
        };
        mutate({ postData: postData }, {
            onSuccess: (data, _variables, _context) => {
                authDispatch(authSlice.actions.userLoginAction({
                    isLoading: false,
                    userLoggedIn: true,
                    userName: postData.email,
                    email: postData.email,
                    token: data.token,
                }));
            },
            onError: (error) => {
                Alert.alert(
                    'Login Failed', `${error.error}`);
            },
            onSettled: (_data, _error, _variables, _context) => {
                // console.log('On Settled', _error);
            },
        });

    };

    const textEmailChange = (val: any) => {
        setuserData({
            ...userData,
            email: val.trim(),
            isValidEmail: true,
        });
    };

    const textPasswordChange = (val: any) => {
        if (val.trim().length >= 8) {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: true,
            });
        } else {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: false,
            });
        }
    };

    return {
        paperTheme,
        userData,
        saveUserLogin,
        textEmailChange,
        textPasswordChange,
        nativeData: { BUILD_ENV, BASE_URL },
        isLoading: isPending
    };
};

export default useLoginScreenModal;
