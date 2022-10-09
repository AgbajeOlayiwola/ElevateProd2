import { userProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    userProfiles: null,
    errorMessage: null
};

const userProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case userProfile.USERPROFILE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                userProfiles: null,
                errorMessage: null
            };
        case userProfile.USERPROFILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userProfiles: payload
            };
        case userProfile.USERPROFILE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default userProfileReducer;
