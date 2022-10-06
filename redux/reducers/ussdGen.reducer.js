import { ussdGen } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    ussdGen: null,
    errorMessageussdGen: null
};

const ussdGenReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ussdGen.USSDGEN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                ussdGen: null,
                errorMessageussdGen: null
            };
        case ussdGen.USSDGEN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ussdGen: payload
            };
        case ussdGen.USSDGEN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageussdGen: payload
            };

        default:
            return state;
    }
};

export default ussdGenReducer;
