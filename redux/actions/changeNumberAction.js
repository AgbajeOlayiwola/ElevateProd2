import { getCookie } from 'cookies-next';
import { changeNumber } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const changeNumberStart = () => ({
    type: changeNumber.CHANGENUMBER_LOAD_START
});

export const changeNumberSuccess = (changeNumberSuccess) => ({
    type: changeNumber.CHANGENUMBER_LOAD_SUCCESS,
    payload: changeNumberSuccess
});

export const changeNumberError = (changeNumberErrorMessage) => ({
    type: changeNumber.CHANGENUMBER_LOAD_ERROR,
    payload: changeNumberErrorMessage
});
export const changeNumberAction = (data) => (dispatch) => {
    dispatch(changeNumberStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.changePhone}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(changeNumberSuccess(response?.data));
        })
        .catch((error) => {
            dispatch(changeNumberError(error?.response?.data?.message));
        });
};
