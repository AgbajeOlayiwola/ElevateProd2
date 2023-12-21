import apiRoutes from '../helper/apiRoutes';
import { newUserCreateCorpAccount } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getNewAccountStart = () => ({
    type: newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_START,
    payload: ''
});
export const getNewAccountSuccess = (newUserAccount) => ({
    type: newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_SUCCESS,
    payload: newUserAccount
});
export const getNewAccountError = (newUserAccountErrorMessage) => ({
    type: newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_ERROR,
    payload: newUserAccountErrorMessage
});

export const getNewUserAccountDetails = (accountData) => {
    return (dispatch) => {
        axiosInstance
            .get(`${apiRoutes.corpAccountStatus}`)
            .then((response) => dispatch(getNewAccountSuccess(response?.data)))
            .catch((error) =>
                dispatch(getNewAccountError(error?.response?.data?.message))
            );
    };
};
