import { transactionFees } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    transactionFees: null,
    errorMessageTransactionFees: null
};

const transactionFeesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case transactionFees.TRANSACTIONFEES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                transactionFees: null,
                errorMessageTransactionFees: null
            };
        case transactionFees.TRANSACTIONFEES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                transactionFees: payload
            };
        case transactionFees.TRANSACTIONFEES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageTransactionFees: payload
            };

        default:
            return state;
    }
};

export default transactionFeesReducer;
