import { getCookie } from 'cookies-next';
import { newUserCreateAccount } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//Create New User Action
export const createNewAccountStart = () => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_START,
    payload: newAccountErrorMessage
});
export const createNewAccountSuccess = (newAccount) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_SUCCESS,
    payload: newAccount
});
export const createNewAccountError = (newAccountErrorMessage) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_ERROR,
    payload: newAccountErrorMessage
});

export const createNewUserAccount = (accountData) => {
    const cookie = getCookie('cookieToken');
    return (dispatch) => {
        axiosInstance
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.newCreateAccount}`,
                accountData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                dispatch(createNewAccountSuccess(response?.data));
            })
            .catch((error) => {
                dispatch(createNewAccountError(error?.response?.data?.message));
            });
    };
};

//End Create New User Action
