import actionType from './language.actionType';
import initialState from './language.initialState';

const languageReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case actionType.LANGUAGE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                language: null,
                errorMessage: null
            };
        case actionType.LANGUAGE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                language: payload
            };
        case actionType.LANGUAGE_LOAD_ERROR:
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
