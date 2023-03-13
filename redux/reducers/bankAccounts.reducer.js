import { getUserBankAccounts } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    bankAccounts: [],
    bankAccountErrorMessages: null
};

const bankAccountsReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                bankAccounts: null,
                bankAccountErrorMessages: null
            };
        case getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bankAccounts: payload
            };
        case getUserBankAccounts.GET_USER_Bank_ACCOUNTS_ACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                bankAccountErrorMessages: payload
            };

        default:
            return state;
    }
};

export default bankAccountsReducer;
