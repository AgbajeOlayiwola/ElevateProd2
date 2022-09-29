import { accountPrimary } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    accountPrimary: null,
    accountPrimaryError: null
};

const accountPrimaryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case accountPrimary.ACCOUNTPRIMARY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                accountPrimary: null,
                accountPrimaryError: null
            };
        case accountPrimary.ACCOUNTPRIMARY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountPrimary: payload
            };
        case accountPrimary.ACCOUNTPRIMARY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                accountPrimaryError: payload
            };

        default:
            return state;
    }
};

export default accountPrimaryReducer;
