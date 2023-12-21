import { getCookie } from 'cookies-next';
import { generateQrType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const generateQrCodeLoad = () => ({
    type: generateQrType.GENERATE_QR_START
});
export const generateQrCodeSuccess = (generateQrCodeSuccess) => ({
    type: generateQrType.GENERATE_QR_SUCCESS,
    payload: generateQrCodeSuccess
});
export const generateQrCodeError = (generateQrCodeError) => ({
    type: generateQrType.GENERATE_QR_ERROR,
    payload: generateQrCodeError
});
export const generateQrCodeDetails = (generateQrCodeData) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.generateQr}`, generateQrCodeData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(generateQrCodeSuccess(response));
        })
        .catch((error) => dispatch(generateQrCodeError(error)));
};

//GENERATE QR CODE END
