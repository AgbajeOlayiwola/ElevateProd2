import { getCookie } from 'cookies-next';
import { deleteAccountType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const deleteAccountStart = () => ({
    type: deleteAccountType.DELETEACCOUNT_LOAD_START
});

export const deleteAccountSuccess = (deleteAccountSuccess) => ({
    type: deleteAccountType.DELETEACCOUNT_LOAD_SUCCESS,
    payload: deleteAccountSuccess
});

export const deleteAccountError = (deleteAccountErrorMessage) => ({
    type: deleteAccountType.DELETEACCOUNT_LOAD_ERROR,
    payload: deleteAccountErrorMessage
});
export const deleteAccountAction = (data) => (dispatch) => {
    dispatch(deleteAccountStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.deleteAccount}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(deleteAccountSuccess(response?.data));
        })
        .catch((error) => {
            dispatch(deleteAccountError(error?.response));
        });
};
