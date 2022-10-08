import { bankStatement } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    bankStatement: null,
    errorMessagebankStatement: null
};

const bankStatementReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case bankStatement.BANKSTATEMENT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                bankStatement: null,
                errorMessagebankStatement: null
            };
        case bankStatement.BANKSTATEMENT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bankStatement: payload
            };
        case bankStatement.BANKSTATEMENT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagebankStatement: payload
            };

        default:
            return state;
    }
};

export default bankStatementReducer;
