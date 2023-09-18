import apiRoutes from '../helper/apiRoutes';
import { intraBankEnquiry } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//intraBankEnquiry action
export const intraBankEnquiryLoadStart = () => ({
    type: intraBankEnquiry.INTRABANKENQUIRY_LOAD_START
});

export const intraBankEnquiryLoadSuccess = (bill) => ({
    type: intraBankEnquiry.INTRABANKENQUIRY_LOAD_SUCCESS,
    payload: bill
});

export const intraBankEnquiryLoadError = (intraBankEnquiryerror) => ({
    type: intraBankEnquiry.INTRABANKENQUIRY_LOAD_ERROR,
    payload: intraBankEnquiryerror
});
export const postIntraBankEnquiry = (data) => (dispatch) => {
    dispatch(intraBankEnquiryLoadStart());
    axiosInstance
        .post(`${apiRoutes.intraBankEnquiry}`, data)
        .then((response) =>
            dispatch(intraBankEnquiryLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(intraBankEnquiryLoadError(error?.response?.data?.message))
        );
};

//intraBankEnquiry action end
