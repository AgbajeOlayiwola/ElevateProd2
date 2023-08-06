import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { shareDocuments } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//shareDocuments actions
export const shareDocumentsLoadStart = () => ({
    type: shareDocuments.SHAREDOCUMENTS_LOAD_START
});

export const shareDocumentsLoadSuccess = (countries) => ({
    type: shareDocuments.SHAREDOCUMENTS_LOAD_SUCCESS,
    payload: countries
});

export const shareDocumentsLoadError = (errorMessage) => ({
    type: shareDocuments.SHAREDOCUMENTS_LOAD_ERROR,
    payload: errorMessage
});

export const shareDocumentsData = () => (dispatch) => {
    dispatch(shareDocumentsLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .get(`${apiRoutes.shareDocuments}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(shareDocumentsLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(shareDocumentsLoadError(error?.response?.data?.message))
        );
};
//shareDocuments actions end
