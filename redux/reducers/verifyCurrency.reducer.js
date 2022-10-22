import { verifyCurrency } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    verifyCurrency: null,
    errorMessageverifyCurrency: null
};

const verifyCurrencyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case verifyCurrency.VERIFYCURRENCY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                verifyCurrency: null,
                errorMessageverifyCurrency: null
            };
        case verifyCurrency.VERIFYCURRENCY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyCurrency: payload
            };
        case verifyCurrency.VERIFYCURRENCY_LOAD_ERROR:
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
