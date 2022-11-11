import { existingUserProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    existingUserProfilee: [],
    errorMessage: ''
};

const existingUserProfileReducer = (
    state = initialState,
    { type, payload }
) => {
    //console.log(payload);÷ss
    switch (type) {
        case existingUserProfile.EXISTINGUSERPROFILE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                existingUserProfilee: [],
                errorMessage: ''
            };
        case existingUserProfile.EXISTINGUSERPROFILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                existingUserProfilee: payload
            };
        case existingUserProfile.EXISTINGUSERPROFILE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default existingUserProfileReducer;
