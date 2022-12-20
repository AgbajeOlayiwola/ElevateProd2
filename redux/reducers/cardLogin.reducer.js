import { cardLogin } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    cardLoginS: [],
    cardLoginerrorMessages: ''
};

const cardLoginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case cardLogin.CARDLOGIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                cardLoginS: [],
                cardLoginerrorMessages: ''
            };
        case cardLogin.CARDLOGIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cardLoginS: payload
            };
        case cardLogin.CARDLOGIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                cardLoginerrorMessages: payload
            };

        default:
            return state;
    }
};

export default cardLoginReducer;
