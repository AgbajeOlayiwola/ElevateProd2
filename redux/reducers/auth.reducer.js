import { login } from '../types/actionTypes';

const initialState = {
    user: [],
    loggedInUser: null,
    errorMessages: '...'
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case login.LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
                errorMessages: payload
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
