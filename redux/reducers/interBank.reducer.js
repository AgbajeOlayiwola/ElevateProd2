import { interBank } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    interBank: null,
    errorMessageInterBank: null
};

const interBankReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case interBank.INTERBANK_LOAD_START:
            return {
                ...state,
                isLoading: true,
                interBank: null,
                errorMessageInterBank: null
            };
        case interBank.INTERBANK_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interBank: payload
            };
        case interBank.INTERBANK_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageInterBank: payload
            };

        default:
            return state;
    }
};

export default interBankReducer;
