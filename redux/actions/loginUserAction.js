import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
import { login } from '../types/actionTypes';
import { setCookie } from 'cookies-next';

// login User
export const userLoadStart = (user) => ({
    type: login.LOGIN_SUCCESS,
    payload: user
});

export const userLoadError = (errorMessages) => ({
    type: login.LOGIN_FAIL,
    payload: errorMessages
});

export const loginUserAction = (loginData) => {
    return (dispatch) => {
        axiosInstance
            .post(`${apiRoutes.login}`, loginData, {
                headers: {
                    // Add other required headers here if needed
                    withCredentials: true
                }
            })
            .then((response) => {
                dispatch(userLoadStart(response?.data));
                // Assuming you have the setCookie function defined correctly
                setCookie('cookieToken', response.data?.data?.token, {
                    secure: true
                });
                // Assuming the local storage key is 'user'
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data?.data?.user)
                );
            })
            .catch((error) => {
                dispatch(userLoadError(error?.response?.data?.message));
            });
    };
};
