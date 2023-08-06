import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { getRC } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getRCLoad = () => ({
    type: getRC.GETRC_START
});
export const getRCSuccess = (existingProfileSetupPay) => ({
    type: getRC.GETRC_SUCCESS,
    payload: existingProfileSetupPay
});
export const getRCError = (existingProfileSetupError) => ({
    type: getRC.GETRC_ERROR,
    payload: existingProfileSetupError
});
export const getRCDetails = (resetOtpdata) => (dispatch) => {
    dispatch(getRCLoad());
    let cookie;

    cookie = getCookie('cookieToken');

    // dispatch(accountNumberLoadStart());
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.businessNameCac}`,
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
            if (response?.data) {
                axios
                    .get(
                        `https://mysmeapp.ecobank.com:8443${apiRoutes.verifyCac}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Client-Type': 'web',
                                Authorization: `Bearer ${cookie}`
                            }
                        }
                    )
                    .then((response) => {
                        dispatch(getRCSuccess(response?.data));
                    })
                    .catch((error) =>
                        dispatch(getRCError(error?.response?.message))
                    );
            }
        })
        .catch((error) => dispatch(getRCError(error?.response?.data?.message)));
};

// business profile setuo action end
