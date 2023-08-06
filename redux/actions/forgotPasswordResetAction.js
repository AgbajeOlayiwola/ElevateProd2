import { getCookie } from 'cookies-next';
import { forgotPasswordReset } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//forgot password Reset start
export const forgotPasswordResetStart = () => ({
    type: forgotPasswordReset.FORGOT_PASSWORD_RESET_START
});

export const forgotPasswordResetSuccess = (forgotPasswordResets) => ({
    type: forgotPasswordReset.FORGOT_PASSWORD_RESET_SUCCESS,
    payload: forgotPasswordResets
});

export const forgotPasswordResetError = (forgotPasswordResetErrorMessages) => ({
    type: forgotPasswordReset.FORGOT_PASSWORD_RESET_ERROR,
    payload: forgotPasswordResetErrorMessages
});
export const forgotPasswordResetData = (data) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.forgotPasswordReset}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${data?.token}`
                }
            }
        )
        .then((response) => {
            dispatch(forgotPasswordResetSuccess(response?.data?.message));
        })
        .catch((error) =>
            dispatch(forgotPasswordResetError(error?.response?.data?.message))
        );
};
//forgot password reset end
