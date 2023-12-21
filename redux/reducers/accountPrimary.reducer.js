import { accountPrimary } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    accountPrimarys: null,
    accountPrimaryError: null
};

const accountPrimaryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case accountPrimary.ACCOUNTPRIMARY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                accountPrimarys: null,
                accountPrimaryError: null
            };
        case accountPrimary.ACCOUNTPRIMARY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountPrimarys: payload
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
