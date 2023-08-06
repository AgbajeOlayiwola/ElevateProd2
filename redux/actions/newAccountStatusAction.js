import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { accountStatus } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const newAccountStatusLoadStart = () => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_START
});

export const newAccountStatusLoadSuccess = (accountStatuss) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_SUCCESS,
    payload: accountStatuss
});

export const newAccountStatusLoadError = (errorMessages) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_ERROR,
    payload: errorMessages
});
export const newAccountStatusData = () => (dispatch) => {
    const cookie = getCookie('cookieToken');
    // dispatch(accountStatusLoadStart());
    axiosInstance
        .get(`https://mysmeapp.ecobank.com:8443${apiRoutes.accountStatus}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(newAccountStatusLoadSuccess(response?.data));
        })
        .catch((error) =>
            dispatch(newAccountStatusLoadError(error?.response?.data?.message))
        );
};

//accountNumber action end
