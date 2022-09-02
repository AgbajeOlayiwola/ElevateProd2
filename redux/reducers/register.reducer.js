import { login } from '../types/actionTypes';

const initialState = {
    user: null,
    loggedInUser: null,
    errorMessage: null
};

const registerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case login.REGISTER_START:
            return {
                ...state,
                user: null,
                loggedInUser: null,
                errorMessage: null
            };
        case login.REGISTER_SUCCESS:
            return {
                ...state,
                user: payload,
                errorMessage: null
            };
        case login.REGISTER_FAIL:
            return {
                ...state,
                errorMessage: payload
            };
        default:
            return state;
    }
};
export default registerReducer;
