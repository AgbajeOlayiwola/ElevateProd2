import { setupProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    profileSetup: null,
    errorMessages: ''
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
        default:
            return state;
    }
};

export default profileSetupReducer;
