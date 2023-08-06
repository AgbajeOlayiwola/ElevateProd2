import { getCookie } from 'cookies-next';
import { unfreezeTransactions } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//unfreezeTransactions actions
export const unfreezeTransactionsLoadStart = () => ({
    type: unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_START
});

export const unfreezeTransactionsLoadSuccess = (countries) => ({
    type: unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_SUCCESS,
    payload: countries
});

export const unfreezeTransactionsLoadError = (errorMessage) => ({
    type: unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_ERROR,
    payload: errorMessage
});

export const loadunfreezeTransactions = () => (dispatch) => {
    dispatch(unfreezeTransactionsLoadStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.unfreezeTransactions}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(unfreezeTransactionsLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(unfreezeTransactionsLoadError(error?.response?.message))
        );
};
//unfreezeTransactions actions end
