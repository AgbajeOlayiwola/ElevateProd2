import { completeProfileLoadSuccess } from '../actions/actions';
import { compProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    profile: null,
    errorMessage: null
};

const profileReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case compProfile.PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: true,
                profile: payload,
                errorMessage: null
            };
        default:
            return state;
    }
};

export default profileReducer;
