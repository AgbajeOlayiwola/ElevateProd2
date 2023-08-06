import { getCookie } from 'cookies-next';
import { qrMerchantInfo_Type } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getQrMerchnatInfoStart = () => ({
    type: qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_START
});

export const getQrMerchnatInfoSuccess = (getQrMerchnatInfoSuccess) => ({
    type: qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_SUCCESS,
    payload: getQrMerchnatInfoSuccess
});

export const getQrMerchnatInfoError = (getQrMerchnatInfoErrorMessage) => ({
    type: qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_ERROR,
    payload: getQrMerchnatInfoErrorMessage
});
export const getQrMerchantInfoGen = () => (dispatch) => {
    dispatch(getQrMerchnatInfoStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.qrMerchantInfo}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getQrMerchnatInfoSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getQrMerchnatInfoError(error)));
};
//Get Qr Merchnat Info actions end
