import { login } from '../types/actionTypes';

const initialState = {
    user: null,
    loggedInUser: null,
    errorMessages: null
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case login.LOGIN_START:
            return {
                ...state,
                user: null,
                loggedInUser: null,
                errorMessages: null
            };
        case login.LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
                errorMessages: null
            };
        case login.LOGIN_FAIL:
            return {
                ...state,
                errorMessages: payload
            };
        default:
            return state;
    }
};
export default authReducer;
