import { getCookie } from 'cookies-next';
import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { uploadMemartType } from '../types/actionTypes';
//upload  uploadMemart start
export const memartStart = () => ({
    type: uploadMemartType.GET_MEMART_START
});

export const memartSuccess = (memart) => ({
    type: uploadMemartType.GET_MEMART_SUCCESS,
    payload: memart
});

export const memartError = (memartErrorMessages) => ({
    type: uploadMemartType.GET_MEMART_ERROR,
    payload: memartErrorMessages
});
export const memartData = (memartdata) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.uploadMemart}`, memartdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(memartSuccess(response));
            // //// console.logresponse);
        })
        .catch((error) =>
            dispatch(memartError(error?.response?.data?.message))
        );
};

//upload  uploadMemart end
