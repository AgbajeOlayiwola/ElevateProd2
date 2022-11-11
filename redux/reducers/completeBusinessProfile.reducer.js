import { completeProfileLoadSuccess } from '../actions/actions';
import { completeProfile } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    compBusprofile: null,
    comperrorMessage: ''
};

const completeBusinessprofileReducer = (
    state = initialState,
    { type, payload }
) => {
    //console.log(payload);÷ss
    switch (type) {
        case completeProfile.COMP_PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: true,
                compBusprofile: payload,
                comperrorMessage: null
            };
        case completeProfile.COMP_PROFILE_LOAD_ERROR:
            return {
                ...state,
                isLoading: true,
                compBusprofile: null,
                comperrorMessage: payload
            };
        default:
            return state;
    }
};

export default completeBusinessprofileReducer;
