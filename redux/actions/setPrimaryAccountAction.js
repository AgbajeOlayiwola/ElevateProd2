import { getCookie } from 'cookies-next';
import { setPrimaryAccountType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const setPrimaryAccountStart = () => ({
    type: setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_START
});

export const setPrimaryAccountSuccess = (setPrimaryAccountSuccess) => ({
    type: setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_SUCCESS,
    payload: setPrimaryAccountSuccess
});

export const setPrimaryAccountError = (setPrimaryAccountErrorMessage) => ({
    type: setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_ERROR,
    payload: setPrimaryAccountErrorMessage
});
export const setPrimaryAccountAction = (data) => (dispatch) => {
    dispatch(setPrimaryAccountStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.setPrimaryAccount}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(setPrimaryAccountSuccess(response));
        })
        .catch((error) => {
            dispatch(setPrimaryAccountError(error?.response));
        });
};
//St primary account Action End
