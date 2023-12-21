import { getCookie } from 'cookies-next';
import { Paylink_Type } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const paylinkGenLoadStart = () => ({
    type: Paylink_Type.PAYLINK_START
});

export const paylinkGenLoadSuccess = (paylikSuccess) => ({
    type: Paylink_Type.PAYLINK_SUCCESS,
    payload: paylikSuccess
});

export const paylinkGenLoadError = (payLinkerrorMessage) => ({
    type: Paylink_Type.PAYLINK_ERROR,
    payload: payLinkerrorMessage
});
export const loadpaylinkGen = (code) => (dispatch) => {
    dispatch(paylinkGenLoadStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.paymentLink}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(paylinkGenLoadSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(paylinkGenLoadError(error)));
};
//PAYLiNK actions end
