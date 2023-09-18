import apiRoutes from '../helper/apiRoutes';
import { accountStatus } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const accountStatusLoadStart = () => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_START
});

export const accountStatusLoadSuccess = (accountStatusData) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_SUCCESS,
    payload: accountStatusData
});

export const accountStatusLoadError = (errorMessages) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_ERROR,
    payload: errorMessages
});
export const accountStatusData = (data) => (dispatch) => {
    dispatch(accountStatusLoadStart());
    axiosInstance
        .get(`${apiRoutes.accountStatus}/${data}`)
        .then((response) => {
            dispatch(accountStatusLoadSuccess(response));
        })
        .catch((error) =>
            dispatch(accountStatusLoadError(error?.response?.data?.message))
        );
};
