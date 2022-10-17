import { unfreezeTransactions } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    unfreezeTransactions: null,
    errorMessage: null
};

const unfreezeTransactionsReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                unfreezeTransactions: null,
                errorMessage: null
            };
        case unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                unfreezeTransactions: payload
            };
        case unfreezeTransactions.UNFREEZETRANSACTIONS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default unfreezeTransactionsReducer;
