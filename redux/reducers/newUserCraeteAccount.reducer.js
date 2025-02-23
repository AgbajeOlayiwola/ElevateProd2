import { newUserCreateAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    newAccount: null,
    newAccountErrorMessage: null
};

const newUsercreateAccountReducer = (
    state = initialState,
    { type, payload }
) => {
    // //// console.log(payload);÷ss
    switch (type) {
        case newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                newAccount: null,
                newAccountErrorMessage: null
            };
        case newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newAccount: payload
            };
        case newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                newAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default newUsercreateAccountReducer;
