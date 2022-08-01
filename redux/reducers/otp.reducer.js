import { otp } from '../types/actionTypes';

const initialState = {
    Loading: false,
    otp: null,
    otpErrorMessage: 'error'
};

const otpReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case otp.OTP_LOAD_SUCCESS:
            return {
                ...state,
                Loading: true,
                otp: null,
                otpErrorMessage: null
            };
        case otp.OTP_LOAD_ERROR:
            return {
                ...state,
                Loading: false,
                otp: null,
                otpErrorMessage: payload
            };

        default:
            return state;
    }
};

export default otpReducer;
