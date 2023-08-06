import { getCookie } from 'cookies-next';
import { interBankEnquiry } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//interBankEnquiry action
export const interBankEnquiryLoadStart = () => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_START
});

export const interBankEnquiryLoadSuccess = (bill) => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_SUCCESS,
    payload: bill
});

export const interBankEnquiryLoadError = (interBankEnquiryerror) => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_ERROR,
    payload: interBankEnquiryerror
});
export const postInterBankEnquiry = (data) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    dispatch(interBankEnquiryLoadStart());
    axiosInstance
        .post(`${apiRoutes.interBankEnquiry}`, data)
        .then((response) =>
            dispatch(interBankEnquiryLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(interBankEnquiryLoadError(error?.response?.data?.message))
        );
};

//interBankEnquiry action end
