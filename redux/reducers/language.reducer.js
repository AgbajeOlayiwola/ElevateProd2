import { languages } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    language: null,
    errorMessage: null
};

const languageReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case languages.LANGUAGE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                language: null,
                errorMessage: null
            };
        case languages.LANGUAGE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                language: payload
            };
        case languages.LANGUAGE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default languageReducer;
