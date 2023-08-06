import { getCookie } from 'cookies-next';
import { transactionHistory } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//transactionHistory action
export const transactionHistoryLoadStart = () => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_START
});

export const transactionHistoryLoadSuccess = (bill) => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_SUCCESS,
    payload: bill
});

export const transactionHistoryLoadError = (transactionHistoryerror) => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_ERROR,
    payload: transactionHistoryerror
});
export const getTransactionHistory = (pageSrchIndex, numOfRecords) => (
    dispatch
) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    dispatch(transactionHistoryLoadStart());
    axiosInstance
        .get(
            `${apiRoutes.transactionHistory}?pageSearchIndex=${pageSrchIndex}&numberOfRecords=${numOfRecords}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) =>
            dispatch(transactionHistoryLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(transactionHistoryLoadError(error?.message))
        );
};

//transactionHistory action end
