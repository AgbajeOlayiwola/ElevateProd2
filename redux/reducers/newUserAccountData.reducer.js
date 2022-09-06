import { newUserCreateCorpAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    newUserAccount: [],
    newUserAccountErrorMessage: ''
};

const newUsercreateCorpAccountData = (
    state = initialState,
    { type, payload }
) => {
    // console.log(payload);÷ss
    switch (type) {
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                newUserAccount: [],
                errorData: ''
            };
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newUserAccount: payload
            };
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newUserAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default newUsercreateCorpAccountReducer;
