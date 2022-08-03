import { verifyBank } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    verifyBank: null,
    errorMessageverifyBank: null
};

const verifyBankReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case verifyBank.VERIFYBANK_LOAD_START:
            return {
                ...state,
                isLoading: true,
                verifyBank: null,
                errorMessageverifyBank: null
            };
        case verifyBank.VERIFYBANK_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyBank: payload
            };
        case verifyBank.VERIFYBANK_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageverifyBank: payload
            };

        default:
            return state;
    }
};

export default verifyBankReducer;
