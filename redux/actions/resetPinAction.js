import { getCookie } from 'cookies-next';
import { resetPin } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const resetPinStart = () => ({
    type: resetPin.RESETPIN_LOAD_START
});

export const resetPinSuccess = (resetPinSuccess) => ({
    type: resetPin.RESETPIN_LOAD_SUCCESS,
    payload: resetPinSuccess
});

export const resetPinError = (resetPinErrorSubMessage) => ({
    type: resetPin.RESETPIN_LOAD_ERROR,
    payload: resetPinErrorSubMessage
});
export const resetPinGen = (data) => (dispatch) => {
    dispatch(resetPinStart(data));
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.resetPin}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(resetPinSuccess(response?.data?.data));
        })
        .catch((error) => {
            dispatch(resetPinError(error?.response));
        });
};
