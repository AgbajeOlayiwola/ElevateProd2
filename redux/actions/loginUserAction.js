import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
import { login } from '../types/actionTypes';
//login User
export const userLoadStart = (errorMessages) => ({
    type: login.LOGIN_SUCCESS,
    payload: errorMessages
});
export const userLoadError = (errorMessages) => ({
    type: login.LOGIN_FAIL,
    payload: errorMessages
});

export const loginUserAction = (loginData) => {
    return (dispatch) => {
        axiosInstance
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.login}`,
                loginData,
                {
                    headers: {
                        credentials: true,
                        'Access-Control-Allow-Credentials': true
                    }
                }
            )
            .then((response) => {
                setCookie('cookieToken', response?.data?.data?.token, {
                    // httpOnly: 'true',
                    // maxAge: 60 * 1,
                    secure: 'true'
                });

                localStorage?.setItem(
                    'user',
                    JSON.stringify(response?.data?.data?.user)
                );

                dispatch(userLoadStart(response?.data));
            })
            .catch((error) => {
                dispatch(userLoadError(error?.response?.data?.message));
            });
    };
};
