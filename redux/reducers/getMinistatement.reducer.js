import { getBeneficiaries, getMiniStatement_Type } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getMiniStatementSuccess: null,
    getMiniStatementerrorMessage: null
};

const getMiniStatementReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case getMiniStatement_Type.GET_MINI_STATEMENT_START:
            return {
                ...state,
                isLoading: true,
                getMiniStatementSuccess: null,
                getMiniStatementerrorMessage: null
            };
        case getMiniStatement_Type.GET_MINI_STATEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getMiniStatementSuccess: payload
            };
        case getMiniStatement_Type.GET_MINI_STATEMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                getMiniStatementerrorMessage: payload
            };

        default:
            return state;
    }
};

export default getMiniStatementReducer;
