import { otp } from '../types/actionTypes';

const initialState = {
    Loading: false,
    otp: null,
    otpErrorMessage: '...',
    bvnError: null,
    bvnErrorI: null,
    bvnNin: null
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
        case otp.BVN_NIN_LOAD_ERROR:
            return {
                ...state,
                Loading: false,
                otp: null,
                otpErrorMessage: null,
                bvnError: payload
            };
        case otp.BVN_NIN_LOAD_ERRORI:
            return {
                ...state,
                bvnErrorI: payload
            };
        case otp.BVN_NIN_LOAD_SUCCESS:
            return {
                ...state,
                bvnNin: payload
            };
        default:
            return state;
    }
};

export default otpReducer;
