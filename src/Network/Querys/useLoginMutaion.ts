import { useMutation } from '@tanstack/react-query';
import { getBaseUrl } from '../../constants/AppConstants';
import { loginUrl } from '../../constants/ServiceUrl';
import { LoginRes } from '../../models/responseType/LoginRes';
import { Api } from '../services';

interface LoginError {
    error?: string;
}

const fetchUser = async ({ postData }: { postData: any }) => {
    const response = await Api.post<LoginRes>(`${getBaseUrl()}${loginUrl}`, postData);
    return response.data;
};

const useUserLogin = () => {
    return useMutation<LoginRes, LoginError, { postData: any }>({
        mutationFn: fetchUser,
        mutationKey: [loginUrl],
    });
};

export { useUserLogin };