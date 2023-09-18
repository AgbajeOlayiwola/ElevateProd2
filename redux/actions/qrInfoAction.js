import { getCookie } from 'cookies-next';
import { qrInfoType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getQrInfoLoad = () => ({
    type: qrInfoType.QR_INFO_START
});
export const getQrInfoSuccess = (QrInfoSuccess) => ({
    type: qrInfoType.QR_INFO_SUCCESS,
    payload: QrInfoSuccess
});
export const getQrInfoError = (QrInfoError) => ({
    type: qrInfoType.QR_INFO_ERROR,
    payload: QrInfoError
});
export const getQrInfoDetails = (QrInfoData) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.cacDocumentUpload}`, QrInfoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getQrInfoSuccess(response));
        })
        .catch((error) => dispatch(getQrInfoError(error?.response)));
};
