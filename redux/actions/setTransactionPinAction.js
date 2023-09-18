import { getCookie } from 'cookies-next';
import { setTransactionPin } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//setTransactionPin actions
export const setTransactionPinLoadStart = () => ({
    type: setTransactionPin.SETTRANSACTIONPIN_LOAD_START
});

export const setTransactionPinLoadSuccess = (billers) => ({
    type: setTransactionPin.SETTRANSACTIONPIN_LOAD_SUCCESS,
    payload: billers
});

export const setTransactionPinLoadError = (errorMessage) => ({
    type: setTransactionPin.SETTRANSACTIONPIN_LOAD_ERROR,
    payload: errorMessage
});
export const loadsetTransactionPin = (code) => (dispatch) => {
    dispatch(setTransactionPinLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.setTransactionPin}`,
            code,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) =>
            dispatch(setTransactionPinLoadSuccess(response?.data))
        )
        .catch((error) =>
            dispatch(setTransactionPinLoadError(error?.response?.data?.message))
        );
};
//setTransactionPin actions end
