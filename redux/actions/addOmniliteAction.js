import { getCookie } from 'cookies-next';
import { addomniLiteType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const addOmniliteStart = () => ({
    type: addomniLiteType.OMNILITE_TYPE_START
});

export const addOmniliteSuccess = (addOmniliteSuccess) => ({
    type: addomniLiteType.OMNILITE_TYPE_SUCCESS,
    payload: addOmniliteSuccess
});

export const addOmniliteError = (addOmniliteErrorMessage) => ({
    type: addomniLiteType.OMNILITE_TYPE_ERROR,
    payload: addOmniliteErrorMessage
});
export const addOmniliteAction = (data) => (dispatch) => {
    dispatch(addOmniliteStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.addOmnilite}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(addOmniliteSuccess(response));
        })
        .catch((error) => {
            dispatch(addOmniliteError(error?.response));
        });
};
