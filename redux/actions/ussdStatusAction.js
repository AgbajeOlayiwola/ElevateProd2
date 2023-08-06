import { getCookie } from 'cookies-next';
import { ussdStatus } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//uusdStatus actions
export const ussdStatusLoadStart = () => ({
    type: ussdStatus.USSDSTATUS_LOAD_START
});

export const ussdStatusLoadSuccess = (billers) => ({
    type: ussdStatus.USSDSTATUS_LOAD_SUCCESS,
    payload: billers
});

export const ussdStatusLoadError = (errorMessage) => ({
    type: ussdStatus.USSDSTATUS_LOAD_ERROR,
    payload: errorMessage
});
export const loadussdStatus = (code) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    dispatch(ussdStatusLoadStart());
    axiosInstance
        .post(`${apiRoutes.ussdStatus}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(ussdStatusLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(ussdStatusLoadError(error?.message)));
};
//uusdStatus actions end
