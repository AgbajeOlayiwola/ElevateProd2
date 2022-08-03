import { verifyCurrency } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    verifyCurrency: null,
    errorMessageverifyCurrency: null
};

const verifyCurrencyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case verifyCurrency.BULKTRANSFER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                verifyCurrency: null,
                errorMessageverifyCurrency: null
            };
        case verifyCurrency.BULKTRANSFER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyCurrency: payload
            };
        case verifyCurrency.BULKTRANSFER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageverifyCurrency: payload
            };

        default:
            return state;
    }
};

export default verifyCurrencyReducer;
