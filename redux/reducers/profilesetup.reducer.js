import { setupProfile, otp } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    profileSetup: null,
    errorMessages: ' ',
    bvnError: ' ',
    bvnErrorI: ' ',
    bvnErrorII: null,
    bvnErrorIII: null,
    bvnNin: null,
    bvnNinPend: ' '
};

const profileSetupReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case setupProfile.PROFILESETUP_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: true,
                profileSetup: payload,
                errorMessages: null
            };
        case setupProfile.PROFILESETUP_LOAD_ERROR:
            return {
                ...state,
                isLoading: true,
                profileSetup: null,
                errorMessages: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERROR:
            return {
                ...state,
                Loading: false,
                otp: null,
                otpErrorMessage: null,
                bvnError: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORI:
            return {
                ...state,
                bvnErrorI: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORII:
            return {
                ...state,
                bvnErrorII: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORIII:
            return {
                ...state,
                bvnErrorIII: payload
            };
        case setupProfile.BVN_NIN_LOAD_SUCCESS:
            return {
                ...state,
                bvnNin: payload
            };
        case setupProfile.BVN_NIN_LOAD_PENDING:
            return {
                ...state,
                bvnNinPend: payload
            };
        default:
            return state;
    }
};

export default profileSetupReducer;
