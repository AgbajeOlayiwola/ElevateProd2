import { uploadScmulType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    scmul: null,
    scmulErrorMessages: null
};

const uploadScmulReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadScmulType.GET_SCMUL_START:
            return {
                ...state,
                isLoading: true,
                scmul: null,
                scmulErrorMessages: null
            };
        case uploadScmulType.GET_SCMUL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                scmul: payload
            };
        case uploadScmulType.GET_SCMUL_ERROR:
            return {
                ...state,
                isLoading: false,
                scmulErrorMessages: payload
            };

        default:
            return state;
    }
};

export default uploadScmulReducer;
