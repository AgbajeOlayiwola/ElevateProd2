import { createAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    newAccount: [],
    newAccountErrorMessage: ''
};

const createAccountReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case createAccount.CREATEACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                newAccount: [],
                errorData: ''
            };
        case createAccount.CREATEACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newAccount: payload
            };
        case createAccount.CREATEACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                newAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default createAccountReducer;
