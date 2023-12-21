import { getCookie } from 'cookies-next';
import { checkStatus } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const checkStatusStart = () => ({
    type: checkStatus.CHECKSTATUS_LOAD_START
});

export const checkStatusSuccess = (checkStatusSuccess) => ({
    type: checkStatus.CHECKSTATUS_LOAD_SUCCESS,
    payload: checkStatusSuccess
});

export const checkStatusError = (checkStatusErrorMessage) => ({
    type: checkStatus.CHECKSTATUS_LOAD_ERROR,
    payload: checkStatusErrorMessage
});
export const checkStatusAction = (data) => (dispatch) => {
    dispatch(checkStatusStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.checkStatus}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(checkStatusSuccess(response));
        })
        .catch((error) => {
            dispatch(checkStatusError(error?.response));
        });
};
