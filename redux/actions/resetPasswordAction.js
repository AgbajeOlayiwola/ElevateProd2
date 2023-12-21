import { getCookie } from 'cookies-next';
import { resetPassword } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//resetPassword actions
export const resetPasswordLoadStart = () => ({
    type: resetPassword.RESETPASSWORD_LOAD_START
});

export const resetPasswordLoadSuccess = (billers) => ({
    type: resetPassword.RESETPASSWORD_LOAD_SUCCESS,
    payload: billers
});

export const resetPasswordLoadError = (errorMessage) => ({
    type: resetPassword.RESETPASSWORD_LOAD_ERROR,
    payload: errorMessage
});
export const loadresetPassword = (code) => (dispatch) => {
    dispatch(resetPasswordLoadStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .patch(`${apiRoutes?.resetPassword}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(resetPasswordLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(resetPasswordLoadError(error?.response?.data?.message))
        );
};
//resetPassword actions end
