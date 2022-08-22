import { states } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    states: null,
    errorMessage: null
};

const statesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case states.STATES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                states: null,
                errorMessage: null
            };
        case states.STATES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                states: payload
            };
        case states.STATES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default statesReducer;
