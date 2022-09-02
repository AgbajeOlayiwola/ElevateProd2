import { cardLogin } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    cardLogin: [],
    errorMessage: ''
};

const cardLoginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case cardLogin.CARDLOGIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                cardLogin: [],
                errorMessage: ''
            };
        case cardLogin.CARDLOGIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cardLogin: payload
            };
        case cardLogin.CARDLOGIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default cardLoginReducer;
