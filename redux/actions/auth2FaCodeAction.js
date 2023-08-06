import apiRoutes from '../helper/apiRoutes';
import { auth2Fa_Type } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const auth2FaCodeLoad = () => ({
    type: auth2Fa_Type.AUTH_2FA_START
});
export const auth2FaCodeSuccess = (auth2FaCodeSuccess) => ({
    type: auth2Fa_Type.AUTH_2FA_SUCCESS,
    payload: auth2FaCodeSuccess
});
export const auth2FaCodeError = (auth2FaCodeError) => ({
    type: auth2Fa_Type.AUTH_2FA_ERROR,
    payload: auth2FaCodeError
});
export const auth2FaCodeDetails = (auth2FaCodeData) => (dispatch) => {
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.auth2Fa}`,
            auth2FaCodeData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web'
                    // withCredentials: true,
                    // Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            localStorage?.setItem(
                'user',
                JSON.stringify(response?.data?.data?.user)
            );
            setCookie('cookieToken', response?.data?.data?.token, {
                // httpOnly: 'true',
                // maxAge: 60 * 1,
                secure: 'true'
            });

            //console.log(response);
            // //console.logresponse.data.data);
            dispatch(auth2FaCodeSuccess(response));
        })
        .catch((error) => dispatch(auth2FaCodeError(error?.response)));
};
