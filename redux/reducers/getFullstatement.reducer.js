import {
    getBeneficiaries,
    getFullStatement_Type,
    getMiniStatement_Type
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getFullStatementSuccess: null,
    getFullStatementerrorMessage: null
};

const getFullStatementReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case getFullStatement_Type.GET_FULL_STATEMENT_START:
            return {
                ...state,
                isLoading: true,
                getFullStatementSuccess: null,
                getFullStatementerrorMessage: null
            };
        case getFullStatement_Type.GET_FULL_STATEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getFullStatementSuccess: payload
            };
        case getFullStatement_Type.GET_FULL_STATEMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                getFullStatementerrorMessage: payload
            };

        default:
            return state;
    }
};

export default getFullStatementReducer;
