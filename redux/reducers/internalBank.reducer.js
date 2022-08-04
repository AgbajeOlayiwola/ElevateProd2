import { internalBank } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    internalBank: null,
    errorMessageInternalBank: null
};

const internalBankReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case internalBank.INTERNALBANK_LOAD_START:
            return {
                ...state,
                isLoading: true,
                internalBank: null,
                errorMessageInternalBank: null
            };
        case internalBank.INTERNALBANK_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                internalBank: payload
            };
        case internalBank.INTERNALBANK_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageInternalBank: payload
            };

        default:
            return state;
    }
};

export default internalBankReducer;
