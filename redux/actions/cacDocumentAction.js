import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { cacDocummentType } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getCacDocumentLoad = () => ({
    type: cacDocummentType.CAC_DOCUMENT_START
});
export const getCacDocumentSuccess = (CacDocumentSuccess) => ({
    type: cacDocummentType.CAC_DOCUMENT_SUCCESS,
    payload: CacDocumentSuccess
});
export const getTCacDocumentrror = (CacDocumentError) => ({
    type: cacDocummentType.CAC_DOCUMENT_ERROR,
    payload: CacDocumentError
});
export const getCacDocumentDetails = (cacDocumentData) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.cacDocumentUpload}`, cacDocumentData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getCacDocumentSuccess(response));
        })
        .catch((error) => dispatch(getCacDocumentError(error?.response)));
};
