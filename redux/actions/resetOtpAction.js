import { getCookie } from 'cookies-next';
import { resetOtpType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//RESET OTP resolution start
export const resetOtpStart = () => ({
    type: resetOtpType.RESET_OTP_START
});

export const resetOtpSuccess = (resetOtp) => ({
    type: resetOtpType.RESET_OTP_SUCCESS,
    payload: resetOtp
});

export const resetOtpError = (resetOtpErrorMessages) => ({
    type: resetOtpType.RESET_OTP_PASSWORD_ERROR,
    payload: resetOtpErrorMessages
});
export const resetOtpData = (resetOtpdata) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
        //  //console.log(cookie);
    }
    // dispatch(accountNumberLoadStart());
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.resetOtp}`,
            resetOtpdata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(resetOtpSuccess(response));
            // //console.logresponse);
        })
        .catch((error) => dispatch(resetOtpError(error)));
};
//RESET OTP resolution end
