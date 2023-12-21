import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { newUserCreateAccount } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//Create New Corporate User Action
export const createNewCorpAccountStart = (newCorpAccountErrorMessage) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_START,
    payload: newCorpAccountErrorMessage
});
export const createNewCorpAccountSuccess = (newCorpAccount) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_SUCCESS,
    payload: newCorpAccount
});
export const createNewCorpAccountError = (newCorpAccountErrorMessage) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_ERROR,
    payload: newCorpAccountErrorMessage
});

export const createNewCorpUserAccount = (accountData) => {
    const cookie = getCookie('cookieToken');
    return (dispatch) => {
        // dispatch(completeProfileLoadStart());
        axiosInstance
            .post(
                `https://ellevate-app.herokuapp.com${apiRoutes.corpNewUser}`,
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
                dispatch(
                    createNewCorpAccountError(error?.response?.data?.message)
                );
            });
    };
};
//End Create New Corporate User Action
