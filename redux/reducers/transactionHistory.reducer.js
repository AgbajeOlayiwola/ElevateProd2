import { transactionHistory } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    transactionHistory: null,
    errorMessageTransactionHistory: null
};

const transactionHistoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case transactionHistory.TRANSACTIONHISTORY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                transactionHistory: null,
                errorMessageTransactionHistory: null
            };
        case transactionHistory.TRANSACTIONHISTORY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                transactionHistory: payload
            };
        case transactionHistory.TRANSACTIONHISTORY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageTransactionHistory: payload
            };

        default:
            return state;
    }
};

export default transactionHistoryReducer;
