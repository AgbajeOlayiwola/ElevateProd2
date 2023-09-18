import { getCookie } from 'cookies-next';
import { verifyTransactionPinType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const verifyTransactionPinStart = () => ({
    type: verifyTransactionPinType.VERIFY_TTRANSACTIONPIN_LOAD_START
});

export const verifyTransactionPinSuccess = (verifyTransactionPinSuccess) => ({
    type: verifyTransactionPinType.VERIFY_TRANSACTIONPIN_LOAD_SUCCESS,
    payload: verifyTransactionPinSuccess
});

export const verifyTransactionPinError = (
    verifyTransactionPinErrorMessage
) => ({
    type: verifyTransactionPinType.VERIFY_TRANSACTIONPIN_LOAD_ERROR,
    payload: verifyTransactionPinErrorMessage
});
export const verifyTransactionPinGet = (data) => (dispatch) => {
    dispatch(verifyTransactionPinStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.verifyTransactionPin}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(verifyTransactionPinSuccess(response?.data));
        })
        .catch((error) => {
            dispatch(verifyTransactionPinError(error?.response));
        });
};
