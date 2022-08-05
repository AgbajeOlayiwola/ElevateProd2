import { login } from '../types/actionTypes';

const initialState = {
    user: [],
    loggedInUser: null,
    errorMessage: '...'
};

const registerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case login.REGISTER_SUCCESS:
            return {
                ...state,
                user: payload,
                errorMessage: payload
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
