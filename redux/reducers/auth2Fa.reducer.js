import { auth2Fa_Type, login } from '../types/actionTypes';

const initialState = {
    auth2FaCodeSuccess: null,
    // loggedInUser: null,
    auth2FaCodeError: null
};

const auth2FaReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case auth2Fa_Type.AUTH_2FA_START:
            return {
                ...state,
                auth2FaCodeSuccess: null,

                auth2FaCodeError: null
            };
        case auth2Fa_Type.AUTH_2FA_SUCCESS:
            return {
                ...state,
                auth2FaCodeSuccess: payload,
                auth2FaCodeError: null
            };
        case auth2Fa_Type.AUTH_2FA_ERROR:
            return {
                ...state,
                auth2FaCodeError: payload
            };
        default:
            return state;
    }
};
export default auth2FaReducer;
