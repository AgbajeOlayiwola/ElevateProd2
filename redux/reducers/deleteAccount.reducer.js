import { createAccount, deleteAccountType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    deleteAccountSuccess: null,
    deleteAccountErrorMessage: ''
};

const deleteAccountReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case deleteAccountType.DELETEACCOUNT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                deleteAccountSuccess: [],
                deleteAccountErrorMessage: ''
            };
        case deleteAccountType.DELETEACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteAccountSuccess: payload
            };
        case deleteAccountType.DELETEACCOUNT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                deleteAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default deleteAccountReducer;
