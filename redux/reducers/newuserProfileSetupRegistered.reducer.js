import { setupProfile, otp } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    busProfileSetup: null,
    busErrorMessages: ' ',
    busBvnError: ' ',
    busBvnErrorI: ' ',
    busBvnErrorII: null,
    busBvnErrorIII: null,
    busBvnNin: null,
    busBvnNinPend: ' '
};

const profileSetupReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case setupProfile.PROFILESETUP_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: true,
                busProfileSetup: payload,
                busErrorMessages: null
            };
        case setupProfile.PROFILESETUP_LOAD_ERROR:
            return {
                ...state,
                isLoading: true,
                busProfileSetup: null,
                busErrorMessages: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERROR:
            return {
                ...state,
                Loading: false,
                busBvnError: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORI:
            return {
                ...state,
                busBvnErrorI: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORII:
            return {
                ...state,
                busBvnErrorII: payload
            };
        case setupProfile.BVN_NIN_LOAD_ERRORIII:
            return {
                ...state,
                busBvnErrorIII: payload
            };
        case setupProfile.BVN_NIN_LOAD_SUCCESS:
            return {
                ...state,
                busBvnNin: payload
            };
        case setupProfile.BVN_NIN_LOAD_PENDING:
            return {
                ...state,
                busBvnNinPend: payload
            };
        default:
            return state;
    }
};

export default profileSetupReducer;
