import { newUserCreateCorpAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    newCorpAccount: [],
    newCorpAccountErrorMessage: ''
};

const newUsercreateCorpAccountReducer = (
    state = initialState,
    { type, payload }
) => {
    // console.log(payload);÷ss
    switch (type) {
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                newCorpAccount: [],
                errorData: ''
            };
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newAccount: payload
            };
        case newUserCreateCorpAccount.CREATE_NEW_CORP_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newCorpAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default newUsercreateCorpAccountReducer;
