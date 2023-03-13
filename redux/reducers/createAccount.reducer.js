import { createAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    createAccount: [],
    errorData: ''
};

const createAccountReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case createAccount.CREATEACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                createAccount: [],
                errorData: ''
            };
        case createAccount.CREATEACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createAccount: payload
            };
        case createAccount.CREATEACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorData: payload
            };

        default:
            return state;
    }
};

export default createAccountReducer;
