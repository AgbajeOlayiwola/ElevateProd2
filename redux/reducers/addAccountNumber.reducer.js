import { addAccountNumberType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    addAccountSuccess: null,
    addAccountErrorMessage: null
};

const addAccountNumberReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case addAccountNumberType.ACCOUNT_NUMBER_START:
            return {
                ...state,
                isLoading: true,
                addAccountSuccess: null,
                addAccountErrorMessage: null
            };
        case addAccountNumberType.ACCOUNT_NUMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addAccountSuccess: payload
            };
        case addAccountNumberType.ACCOUNT_NUMBER_ERROR:
            return {
                ...state,
                isLoading: false,
                addAccountErrorMessage: payload
            };

        default:
            return state;
    }
};

export default addAccountNumberReducer;
