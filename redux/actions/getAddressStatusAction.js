import { getCookie } from 'cookies-next';
import { addressVerificationType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getAddressStatusLoad = () => ({
    type: addressVerificationType.ADDRESS_VERIFICATION_START
});
export const getAddressStatusSuccess = (addressVerificationSuc) => ({
    type: addressVerificationType.ADDRESS_VERIFICATION_SUCCESS,
    payload: addressVerificationSuc
});
export const getAddressStatusError = (addressVerificationsError) => ({
    type: addressVerificationType.ADDRESS_VERIFICATION_ERROR,
    payload: addressVerificationsError
});
export const getAddressStatusDetails = () => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .get(`${apiRoutes.addressVerification}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getAddressStatusSuccess(response));
        })
        .catch((error) => dispatch(getAddressStatusError(error?.response)));
};

//ADDRESS VERIFICATION END
