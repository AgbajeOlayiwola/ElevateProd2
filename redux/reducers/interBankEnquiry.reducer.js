import { interBankEnquiry } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    interBankEnquiry: null,
    errorMessageInterBankEnquiry: null
};

const interBankEnquiryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case interBankEnquiry.INTERBANKENQUIRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                interBankEnquiry: null,
                errorMessageInterBankEnquiry: null
            };
        case interBankEnquiry.INTERBANKENQUIRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interBankEnquiry: payload
            };
        case interBankEnquiry.INTERBANKENQUIRY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageInterBankEnquiry: payload
            };

        default:
            return state;
    }
};

export default interBankEnquiryReducer;
