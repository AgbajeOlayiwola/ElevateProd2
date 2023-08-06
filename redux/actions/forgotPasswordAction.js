import { getCookie } from 'cookies-next';
import { forgotPasswordtype } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
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
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.forgotPassword}`,
            forgotPassworddata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(forgotPasswordSuccess(response?.data?.message));
            // //console.log(response);
        })
        .catch((error) =>
            dispatch(forgotPasswordError(error?.response?.data?.message))
        );
};
//forgot password resolution end
