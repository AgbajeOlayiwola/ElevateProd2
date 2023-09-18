import { getCookie } from 'cookies-next';
import { accountPrimary } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//accountPrimary actions
export const accountPrimaryLoadStart = () => ({
    type: accountPrimary.ACCOUNTPRIMARY_LOAD_START
});

export const accountPrimaryLoadSuccess = (accountPrimarys) => ({
    type: accountPrimary.ACCOUNTPRIMARY_LOAD_SUCCESS,
    payload: accountPrimarys
});

export const accountPrimaryLoadError = (accountPrimaryError) => ({
    type: accountPrimary.ACCOUNTPRIMARY_LOAD_ERROR,
    payload: accountPrimaryError
});

export const loadAccountPrimary = () => (dispatch) => {
    dispatch(accountPrimaryLoadStart());

    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.accountPrimary}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(accountPrimaryLoadSuccess(response?.data)))
        .catch((error) => dispatch(accountPrimaryLoadError(error?.response)));
};
//accountPrimary actions end
