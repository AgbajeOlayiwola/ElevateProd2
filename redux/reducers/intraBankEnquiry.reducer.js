import { intraBankEnquiry } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    intraBankEnquiry: null,
    errorMessageIntraBankEnquiry: null
};

const intraBankEnquiryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case intraBankEnquiry.INTRABANKENQUIRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                intraBankEnquiry: null,
                errorMessageIntraBankEnquiry: null
            };
        case intraBankEnquiry.INTRABANKENQUIRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                intraBankEnquiry: payload
            };
        case intraBankEnquiry.INTRABANKENQUIRY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageIntraBankEnquiry: payload
            };

        default:
            return state;
    }
};

export default intraBankEnquiryReducer;
