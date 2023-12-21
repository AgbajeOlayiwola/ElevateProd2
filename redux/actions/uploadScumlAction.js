import { getCookie } from 'cookies-next';
import { uploadScmulType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//upload scmul document start
export const scmulStart = () => ({
    type: uploadScmulType.GET_SCMUL_START
});

export const scmulSuccess = (scmul) => ({
    type: uploadScmulType.GET_SCMUL_SUCCESS,
    payload: scmul
});

export const scmulError = (scmulErrorMessages) => ({
    type: uploadScmulType.GET_SCMUL_ERROR,
    payload: scmulErrorMessages
});
export const scmulData = (scmuldata) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.uploadScmul}`, scmuldata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(scmulSuccess(response));
        })
        .catch((error) => dispatch(scmulError(error?.response?.data?.message)));
};
//upload scmul document end
