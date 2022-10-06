import { login, resetOtpType } from '../types/actionTypes';

const initialState = {
    user: null,
    resetOtp: null,
    resetOtpErrorMessages: null
};

const resetOtpReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case resetOtpType.RESET_OTP_START:
            return {
                ...state,
                user: null,
                resetOtp: null,
                resetOtpErrorMessages: null
            };
        case resetOtpType.RESET_OTP_SUCCESS:
            return {
                ...state,
                resetOtp: payload,
                resetOtpErrorMessages: null
            };
        case resetOtpType.RESET_OTP_PASSWORD_ERROR:
            return {
                ...state,
                resetOtpErrorMessages: payload
            };
        default:
            return state;
    }
};
export default resetOtpReducer;
