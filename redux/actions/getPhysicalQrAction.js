import { getCookie } from 'cookies-next';
import { requestPhysicalQrType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const requestPhysicalQrStart = () => ({
    type: requestPhysicalQrType.REQUEST_PHYSICAL_QR_LOAD_START
});

export const requestPhysicalQrSuccess = (requestPhysicalQrSuccess) => ({
    type: requestPhysicalQrType.REQUEST_PHYSICAL_QR_LOAD_SUCCESS,
    payload: requestPhysicalQrSuccess
});

export const requestPhysicalQrError = (requestPhysicalQrErrorMessage) => ({
    type: requestPhysicalQrType.REQUEST_PHYSICAL_QR_LOAD_ERROR,
    payload: requestPhysicalQrErrorMessage
});
export const requestPhysicalQrAction = (data) => (dispatch) => {
    dispatch(requestPhysicalQrStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.requestPhysicalQr}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(requestPhysicalQrSuccess(response));
        })
        .catch((error) => {
            dispatch(requestPhysicalQrError(error?.response));
        });
};
