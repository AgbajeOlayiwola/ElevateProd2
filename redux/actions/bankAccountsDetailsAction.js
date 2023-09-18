//bank accounts start
import axiosInstance from '../helper/apiClient';
import { getCookie } from 'cookies-next';
import { getUserBankAccounts } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';

// I change what was been dispatched for existing user and also changed the axios to axios instance
export const bankAccountsStart = () => ({
    type: getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_START
});

export const bankAccountsSuccess = (bankAccounts) => ({
    type: getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_SUCCESS,
    payload: bankAccounts
});

export const bankAccountsLoadError = (bankAccountErrorMessages) => ({
    type: getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_ERROR,
    payload: bankAccountErrorMessages
});
export const bankAccountsData = () => (dispatch) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axiosInstance
        .get(`https://mysmeapp.ecobank.com:8443${apiRoutes.banksAccounts}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(bankAccountsSuccess(response?.data));
        })
        .catch((error) =>
            dispatch(bankAccountsLoadError(error?.response?.data?.message))
        );
};

//bank accunt end
