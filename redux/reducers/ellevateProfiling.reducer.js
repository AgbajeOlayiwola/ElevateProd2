import { postEllevateProfilingDetails } from '../actions/actions';
import { postEllevateProfilling } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    ellevateProfilingSeccess: null,
    ellevateProfillingError: null
};

const postEllevateReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case postEllevateProfilling.POST_ELLEVATE_PROFILLING_START:
            return {
                ...state,
                isLoading: true,
                ellevateProfilingSeccess: null,
                ellevateProfillingError: null
            };
        case postEllevateProfilling.POST_ELLEVATE_PROFILLING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ellevateProfilingSeccess: payload
            };
        case postEllevateProfilling.POST_ELLEVATE_PROFILLING_ERROR:
            return {
                ...state,
                isLoading: false,
                ellevateProfillingError: payload
            };

        default:
            return state;
    }
};

export default postEllevateReducer;
