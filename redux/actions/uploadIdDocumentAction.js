import { getCookie } from 'cookies-next';
import { uploadIdDocType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//Upload identification Documentation start
export const identificationDocStart = () => ({
    type: uploadIdDocType.GET_ID_DOCUMENTATION_START
});

export const identificationDocSuccess = (identification) => ({
    type: uploadIdDocType.GET_ID_DOCUMENTATION_SUCCESS,
    payload: identification
});

export const identificationDocError = (identificationErrorMessages) => ({
    type: uploadIdDocType.GET_ID_DOCUMENTATION_ERROR,
    payload: identificationErrorMessages
});
export const identificationDocData = (identificationdata) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.uploadIdentificationDoc}`, identificationdata, {
            headers: {
                // 'Content-Type': 'multipart/form-data',  'X-Client-Type': 'web',
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(identificationDocSuccess(response?.data?.message));
        })
        .catch((error) =>
            dispatch(identificationDocError(error?.response?.data?.message))
        );
};

//upload identification Documentation end
