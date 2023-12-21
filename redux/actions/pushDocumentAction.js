import { getCookie } from 'cookies-next';
import { pushDocuments } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//pushDocuments actions
export const pushDocumentsLoadStart = () => ({
    type: pushDocuments.PUSHDOCUMENTS_LOAD_START
});

export const pushDocumentsLoadSuccess = (countries) => ({
    type: pushDocuments.PUSHDOCUMENTS_LOAD_SUCCESS,
    payload: countries
});

export const pushDocumentsLoadError = (errorMessage) => ({
    type: pushDocuments.PUSHDOCUMENTS_LOAD_ERROR,
    payload: errorMessage
});

export const pushDocumentsData = () => (dispatch) => {
    dispatch(pushDocumentsLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .get(`https://mysmeapp.ecobank.com:8443${apiRoutes.pushDocuments}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(pushDocumentsLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(pushDocumentsLoadError(error?.response?.data?.message))
        );
};
//pushDocuments actions end
