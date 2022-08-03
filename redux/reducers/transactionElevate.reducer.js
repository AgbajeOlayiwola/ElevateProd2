import { transactionElevate } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    transactionElevate: null,
    errorMessageTransactionElevate: null
};

const transactionElevateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case transactionElevate.TRANSACTIONELEVATE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                transactionElevate: null,
                errorMessageTransactionElevate: null
            };
        case transactionElevate.TRANSACTIONELEVATE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                transactionElevate: payload
            };
        case transactionElevate.TRANSACTIONELEVATE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageTransactionElevate: payload
            };

        default:
            return state;
    }
};

export default transactionElevateReducer;
