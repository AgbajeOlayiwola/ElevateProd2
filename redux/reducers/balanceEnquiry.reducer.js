import { balanceEnquiry } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    balanceEnquiry: null,
    errorMessage: null
};

const balanceEnquiryReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case balanceEnquiry.BALANCEENQUIRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                balanceEnquiry: null,
                errorMessage: null
            };
        case balanceEnquiry.BALANCEENQUIRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                balanceEnquiry: payload
            };
        case balanceEnquiry.BALANCEENQUIRY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default balanceEnquiryReducer;
