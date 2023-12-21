import apiRoutes from '../helper/apiRoutes';
import { transactionFees } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//transactionFees action
export const transactionFeesLoadStart = () => ({
    type: transactionFees.TRANSACTIONFEES_LOAD_START
});

export const transactionFeesLoadSuccess = (bill) => ({
    type: transactionFees.TRANSACTIONFEES_LOAD_SUCCESS,
    payload: bill
});

export const transactionFeesLoadError = (transactionFeeserror) => ({
    type: transactionFees.TRANSACTIONFEES_LOAD_ERROR,
    payload: transactionFeeserror
});
export const getTransactionFees = (data) => (dispatch) => {
    dispatch(transactionFeesLoadStart());
    axiosInstance
        .post(`${apiRoutes.transactionFees}`, data)
        .then((response) =>
            dispatch(transactionFeesLoadSuccess(response?.data))
        )
        .catch((error) =>
            dispatch(transactionFeesLoadError(error?.response?.data?.message))
        );
};

//transactionFees action end
