import axios from 'axios';
import { getJsonAsync } from '../utils/async';
import Toast from 'react-native-toast-message';
import { DEV_BASE_URL } from '../config';

const axiosInstance = axios.create({
    baseURL: DEV_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const data = await getJsonAsync('access_token');
        const token = data?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { status } = error.response;

        if (status === 401) {
            // await resetToLogin();
        }

        return Promise.reject(error);
    }
);


export const makeApiRequest = ({ method, url, data, params, headers, dispatch }) =>
    new Promise((resolve, reject) => {
        const options = {
            method,
            url,
            data,
            params,
            headers,
            validateStatus: () => true,
        };

        axiosInstance(options)
            .then(async (response) => {
                const { status } = response;

                if (response.data?.error === "invalid_grant") {
                    reject(response);
                }

                else if (status === 401) {
                    try {

                    } catch (error) {
                        console.log("Refresh Token Error:", error);
                        reject(error);
                    }
                }

                else if (status === 403) {
                    Toast.show({
                        type: 'error',
                        text1: "You don't have permission to access this resource.",
                        position: 'bottom',
                    });
                    resolve(response);
                }
                else if (status === 404) {
                    Toast.show({
                        type: 'error',
                        text1: "Not found",
                        position: 'bottom',
                    });
                    resolve(response);
                }
                else if (status === 500) {
                    Toast.show({
                        type: 'error',
                        text1: "Internal server error. Please try again later.",
                        position: 'bottom',
                    });
                    reject(response);
                }
                else if (status === 504) {
                    Toast.show({
                        type: 'error',
                        text1: "Something went wrong. Please try again later.",
                        position: 'bottom',
                    });
                    reject(response);
                } else if (status >= 400) {
                    Toast.show({
                        type: 'error',
                        text1: `Error ${response?.data?.detail?.replace(/^400 BAD_REQUEST\s*/, '')}`,
                        position: 'bottom',
                    });
                    reject(response);
                }
                else {
                    resolve(response);
                }
            })
            .catch((error) => {
                console.log('API Request Error:', error);
                Toast.show({
                    type: 'error',
                    text1: "An error occurred. Please check your connection.",
                    position: 'bottom',
                });
                reject(error);

            });
    });


export default axiosInstance;
