import {
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';
import NativeBuildEnv from '../../../specs/NativeBuildEnv';


const useLoginScreenModal = () => {
    const paperTheme = useTheme();

    const BUILD_ENV = NativeBuildEnv.getBuildType(); 
    const BASE_URL = NativeBuildEnv.getBaseUrl(); 

    const authDispatch = useDispatch();
    const { mutate, isPending } = useUserLogin();

    const saveUserLogin = async () => {
        let postData = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
            // email: '',
            // password: '', 
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


    return {
        paperTheme,
        saveUserLogin,
        nativeData: { BUILD_ENV, BASE_URL },
        isLoading: isPending
    };
};

export default useLoginScreenModal;