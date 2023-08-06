import { getCookie } from 'cookies-next';
import { interBank } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//interBank action
export const interBankLoadStart = () => ({
    type: interBank.INTERBANK_LOAD_START
});

export const interBankLoadSuccess = (bill) => ({
    type: interBank.INTERBANK_LOAD_SUCCESS,
    payload: bill
});

export const interBankLoadError = (interBankerror) => ({
    type: interBank.INTERBANK_LOAD_ERROR,
    payload: interBankerror
});
export const postInterBank = (data) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    dispatch(interBankLoadStart());
    axiosInstance
        .post(`${apiRoutes.interBank}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(interBankLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(interBankLoadError(error?.response.data.message))
        );
};
