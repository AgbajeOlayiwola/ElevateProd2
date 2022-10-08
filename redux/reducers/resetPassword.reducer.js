import { resetPassword } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    resetPassword: null,
    errorMessageresetPassword: null
};

const resetPasswordReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case resetPassword.RESETPASSWORD_LOAD_START:
            return {
                ...state,
                isLoading: true,
                resetPassword: null,
                errorMessageresetPassword: null
            };
        case resetPassword.RESETPASSWORD_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resetPassword: payload
            };
        case resetPassword.RESETPASSWORD_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageresetPassword: payload
            };

        default:
            return state;
    }
};

export default resetPasswordReducer;
