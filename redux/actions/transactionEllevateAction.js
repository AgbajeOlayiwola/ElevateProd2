import { getCookie } from 'cookies-next';
import { transactionElevate } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//transactionElevate action
export const transactionElevateLoadStart = () => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_START
});

export const transactionElevateLoadSuccess = (bill) => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_SUCCESS,
    payload: bill
});

export const transactionElevateLoadError = (transactionElevateerror) => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_ERROR,
    payload: transactionElevateerror
});
export const getTransactionElevate = (
    pageSrchIndex,
    numOfRecords,
    transactionType
) => (dispatch) => {
    dispatch(transactionElevateLoadStart());
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(
            `${apiRoutes.transactionElevate}?pageSearchIndex=${pageSrchIndex}&numberOfRecords=${numOfRecords}&transactionType=${transactionType}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) =>
            dispatch(transactionElevateLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(transactionElevateLoadError(error?.message))
        );
};

//transactionElevate action end
