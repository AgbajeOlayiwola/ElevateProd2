import { getCookie } from 'cookies-next';
import { ussdGen } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//uusdGen actions
export const ussdGenLoadStart = () => ({
    type: ussdGen.USSDGEN_LOAD_START
});

export const ussdGenLoadSuccess = (billers) => ({
    type: ussdGen.USSDGEN_LOAD_SUCCESS,
    payload: billers
});

export const ussdGenLoadError = (errorMessage) => ({
    type: ussdGen.USSDGEN_LOAD_ERROR,
    payload: errorMessage
});
export const loadussdGen = (code) => (dispatch) => {
    dispatch(ussdGenLoadStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.ussdGen}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(ussdGenLoadSuccess(response.data.data)))
        .catch((error) => dispatch(ussdGenLoadError(error)));
};
//uusdGen actions end
