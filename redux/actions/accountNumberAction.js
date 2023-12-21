import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { accountNumber } from '../types/actionTypes';

//accountNumber action
export const accountNumberLoadStart = () => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_START
});

export const accountNumberLoadSuccess = (accountNumbers) => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_SUCCESS,
    payload: accountNumbers
});

export const accountNumberLoadError = (errorMessages) => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_ERROR,
    payload: errorMessages
});
export const accountNumberData = (data) => (dispatch) => {
    dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.accountNumber}`, data)
        .then((response) => {
            dispatch(accountNumberLoadSuccess(response?.data));
        })
        .catch((error) =>
            dispatch(accountNumberLoadError(error?.response?.data?.message))
        );
};

//accountNumber action end
