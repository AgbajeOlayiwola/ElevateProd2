import { getCookie } from 'cookies-next';
import { balanceEnquiry } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//balanceEnquiry action
export const balanceEnquiryLoadStart = () => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_START
});

export const balanceEnquiryLoadSuccess = (bill) => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_SUCCESS,
    payload: bill
});

export const balanceEnquiryLoadError = (balanceEnquiryerror) => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_ERROR,
    payload: balanceEnquiryerror
});
export const getBalanceEnquiry = (data) => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(balanceEnquiryLoadStart());
    axiosInstance
        .post(`${apiRoutes.balanceEnquiry}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(balanceEnquiryLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(balanceEnquiryLoadError(error?.message)));
};

//balanceEnquiry action end
