import { completeProfileLoadSuccess } from '../actions/actions';
import { completeProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    compBusprofile: null,
    errorMessage: ''
};

const completeBusinessprofileReducer = (
    state = initialState,
    { type, payload }
) => {
    // console.log(payload);÷ss
    switch (type) {
        case completeProfile.COMP_PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: true,
                compBusprofile: payload,
                errorMessage: null
            };
        case completeProfile.COMP_PROFILE_LOAD_ERROR:
            return {
                ...state,
                isLoading: true,
                compBusprofile: null,
                errorMessage: payload
            };
        default:
            return state;
    }
};

export default completeBusinessprofileReducer;
