import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getBaseUrl, getDefaultHeader } from '../../constants/AppConstants';


const defaultTimeOut = 30000;
const DEBUG = true;
// const DEBUG = getEnvironmentVariable();

const Api = Axios.create({
    headers: {
        'Content-Type': 'application/json',
        ...getDefaultHeader(),
    },
    withCredentials: true,
    timeout: defaultTimeOut,
});


Api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        /** In dev, intercepts request and logs it into console for dev */
        config.baseURL = getBaseUrl();
        if (DEBUG) {
            console.info('Service Request', config);
        }
        return config;
    },
    (error: any) => {
        if (DEBUG) { console.log('Service Error', error); }
        return Promise.reject(error);
    });

/**
* Passes response.data to services.
* In dev, intercepts response and logs it into console for dev
*/

// Helper function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const RESPONSE_DELAY = 1000; // delay in ms

Api.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (DEBUG) { console.info('Service Response', response); }
        try {
            await delay(RESPONSE_DELAY); // ⬅️ delay added here
            return Promise.resolve(response);
        } catch (error) {
            if (DEBUG) { console.log('Error: ', error); }
            return Promise.reject(error);
        }
    },
    async (error: any) => {
        if (error.response && error.response.status === 401) {
            // TODO change according project requirement
        }
        if (error.response && error.response.data) {
            if (DEBUG) { console.log('Error: ', error.response); }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    });

export default Api;
