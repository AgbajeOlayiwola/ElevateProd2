import apiRoutes from '../helper/apiRoutes';
import { createAccount } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const createAccountLoadStart = () => ({
    type: createAccount.CREATEACCOUNT_LOAD_START
});

export const createAccountLoadSuccess = (bill) => ({
    type: createAccount.CREATEACCOUNT_LOAD_SUCCESS,
    payload: bill
});

export const createAccountLoadError = (errorData) => ({
    type: createAccount.CREATEACCOUNT_LOAD_ERROR,
    payload: errorData
});
export const createAccountData = (data) => (dispatch) => {
    dispatch(createAccountLoadStart());
    axiosInstance
        .post(`${apiRoutes.createAccount}`, data)
        .then((response) => dispatch(createAccountLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(createAccountLoadError(error?.response?.data?.message))
        );
};

//accountNumber action end
