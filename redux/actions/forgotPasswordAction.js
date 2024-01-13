import { getCookie } from 'cookies-next';
import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { forgotPasswordtype } from '../types/actionTypes';
//forgot password resolution start
export const forgotPasswordStart = () => ({
    type: forgotPasswordtype.GET_FORGOT_PASSWORD_START
});

export const forgotPasswordSuccess = (forgotPassword) => ({
    type: forgotPasswordtype.GET_FORGOT_PASSWORD_SUCCESS,
    payload: forgotPassword
});

export const forgotPasswordError = (forgotPasswordErrorMessages) => ({
    type: forgotPasswordtype.GET_FORGOT_PASSWORD_ERROR,
    payload: forgotPasswordErrorMessages
});
export const forgotPasswordData = (forgotPassworddata) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.forgotPassword}`, forgotPassworddata, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(forgotPasswordSuccess(response?.data?.message));
            // //// console.log(response);
        })
        .catch((error) =>
            dispatch(forgotPasswordError(error?.response?.data?.message))
        );
};
//forgot password resolution end
