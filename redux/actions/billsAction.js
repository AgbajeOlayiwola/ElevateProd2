import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { bills } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const billsLoadStart = () => ({
    type: bills.BILLS_LOAD_START
});

export const billsLoadSuccess = (bill) => ({
    type: bills.BILLS_LOAD_SUCCESS,
    payload: bill
});

export const billsLoadError = (errorMessageBills) => ({
    type: bills.BILLS_LOAD_ERROR,
    payload: errorMessageBills
});
export const postBills = (data) => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(billsLoadStart());
    axiosInstance
        .post(`${apiRoutes.bills}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(billsLoadSuccess(response?.data?.data)))
        .catch((error) =>
            dispatch(billsLoadError(error?.response?.data?.message))
        );
};

//bills action end
