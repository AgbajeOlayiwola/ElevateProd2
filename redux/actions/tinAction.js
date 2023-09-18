import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { tinType } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getTinLoad = () => ({
    type: tinType.TIN_START
});
export const getTinSuccess = (tinSuccess) => ({
    type: tinType.TIN_SUCCESS,
    payload: tinSuccess
});
export const getTinError = (tinError) => ({
    type: tinType.TIN_ERROR,
    payload: tinError
});
export const getTinDetails = (tinData) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.uploadTin}`, tinData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getTinSuccess(response));
        })
        .catch((error) => dispatch(getTinError(error?.response)));
};
