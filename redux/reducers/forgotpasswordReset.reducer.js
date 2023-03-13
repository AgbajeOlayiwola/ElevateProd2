import { forgotPasswordReset } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    forgotPasswordReset: null,
    forgotPasswordResetErrorMessages: null
};

const forgotPasswordResetReducer = (
    state = initialState,
    { type, payload }
) => {
    //console.log(payload);÷ss
    switch (type) {
        case forgotPasswordReset.FORGOT_PASSWORD_RESET_START:
            return {
                ...state,
                isLoading: true,
                forgotPasswordReset: null,
                forgotPasswordResetErrorMessages: null
            };
        case forgotPasswordReset.FORGOT_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forgotPasswordReset: payload
            };
        case forgotPasswordReset.FORGOT_PASSWORD_RESET_ERROR:
            return {
                ...state,
                isLoading: false,
                forgotPasswordResetErrorMessages: payload
            };

        default:
            return state;
    }
};

export default forgotPasswordResetReducer;
