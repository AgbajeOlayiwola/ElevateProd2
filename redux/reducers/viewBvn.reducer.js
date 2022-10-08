import { viewBvn } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    viewBvn: null,
    errorMessageviewBvn: null
};

const viewBvnReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case viewBvn.VIEWBVN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                viewBvn: null,
                errorMessageviewBvn: null
            };
        case viewBvn.VIEWBVN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                viewBvn: payload
            };
        case viewBvn.VIEWBVN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageviewBvn: payload
            };

        default:
            return state;
    }
};

export default viewBvnReducer;
