import { getCookie } from 'cookies-next';
import { uploadUtilityDocumentype } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//tility upload start
export const uploadUtilityStart = () => ({
    type: uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_START
});

export const uploadUtilitySuccess = (utilityUpload) => ({
    type: uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_SUCCESS,
    payload: utilityUpload
});

export const uploadUtilityError = (utilityUplodaErrorMessages) => ({
    type: uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_ERROR,
    payload: utilityUplodaErrorMessages
});
export const uploadUtilityData = (utilitydata) => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.uploadUtilityDocument}`, utilitydata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(uploadUtilitySuccess(response));
        })
        .catch((error) =>
            dispatch(uploadUtilityError(error?.response?.data?.message))
        );
};

//utility upload end
