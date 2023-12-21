import { viewBvn, vninType } from '../types/actionTypes';

const initialState = {
    // isLoading: false,
    vninMSeccess: null,
    vninMError: null
};

const vninReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case vninType.VNIN_START:
            return {
                ...state,
                isLoading: true,
                vninMSeccess: null,
                vninMError: null
            };
        case vninType.VNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                vninMSeccess: payload
            };
        case vninType.VNIN_ERROR:
            return {
                ...state,
                isLoading: false,
                vninMError: payload
            };

        default:
            return state;
    }
};

export default vninReducer;
