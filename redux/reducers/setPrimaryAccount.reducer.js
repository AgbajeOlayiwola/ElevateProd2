import {
    createAccount,
    deleteAccountType,
    setPrimaryAccountType
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    setPrimaryAccountSuccess: [],
    setPrimaryAccountErrorMessage: ''
};

const setPrimaryAccountReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                setPrimaryAccountSuccess: [],
                setPrimaryAccountErrorMessage: ''
            };
        case setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                setPrimaryAccountSuccess: false,
                deleteAccountSuccess: payload
            };
        case setPrimaryAccountType.SET_PRIMARY_ACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                setPrimaryAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default setPrimaryAccountReducer;
