import { freezeTransactions } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    freezeTransactions: null,
    errorMessageFreeze: null
};

const freezeTransactionsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case freezeTransactions.FREEZETRANSACTIONS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                freezeTransactions: null,
                errorMessageFreeze: null
            };
        case freezeTransactions.FREEZETRANSACTIONS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                freezeTransactions: payload
            };
        case freezeTransactions.FREEZETRANSACTIONS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageFreeze: payload
            };

        default:
            return state;
    }
};

export default freezeTransactionsReducer;
