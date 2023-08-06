import { getCookie } from 'cookies-next';
import { otpType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//BVN Otp
export const otpLoadStart = (errorMessages) => ({
    type: otpType.OTP_LOAD_START,
    payload: errorMessages
});
export const otpLoadSuccess = (otpActData) => ({
    type: otpType.OTP_LOAD_SUCCESS,
    payload: otpActData
});
export const otpLoadError = (otpErrorMessage) => ({
    type: otpType.OTP_LOAD_ERROR,
    payload: otpErrorMessage
});

export const runVerifyOtp = (otpData) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    return async (dispatch) => {
        await axiosInstance
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.verifyOtp}`,
                otpData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                dispatch(otpLoadSuccess(response?.data));
            })
            .catch((error) => {
                dispatch(otpLoadError(error));
            });
    };
};

//BVN OTP End
