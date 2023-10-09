import { getCookie } from 'cookies-next';
import { uploadCacCertType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//upload cac document start
export const cacStart = () => ({
    type: uploadCacCertType.GET_CAC_CERIFICATE_START
});

export const cacSuccess = (cac) => ({
    type: uploadCacCertType.GET_CAC_CERIFICATE_SUCCESS,
    payload: cac
});

export const cacError = (cacErrorMessages) => ({
    type: uploadCacCertType.GET_CAC_CERIFICATEERROR,
    payload: cacErrorMessages
});
export const cacData = (cacdata) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.uploadCacCert}`, cacdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(cacSuccess(response?.data?.message));
        })
        .catch((error) => {
            dispatch(cacError(error?.response));
        });
};
//upload cac document end
