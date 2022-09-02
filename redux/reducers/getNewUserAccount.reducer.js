import { getNewUserAccount } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    newUserAccount: [],
    newUserAccountErrorMessage: ''
};

const getNewUserAccountReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case getNewUserAccount.GET_NEW_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                newUserAccount: [],
                newUserAccountErrorMessage: ''
            };
        case getNewUserAccount.GET_NEW_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newUserAccount: payload
            };
        case getNewUserAccount.GET_NEW_ACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                newUserAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getNewUserAccountReducer;
