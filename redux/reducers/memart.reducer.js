import { uploadMemartType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    memart: null,
    memartErrorMessages: null
};

const uploadMemartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadMemartType.GET_MEMART_START:
            return {
                ...state,
                isLoading: true,
                memart: null,
                memartErrorMessages: null
            };
        case uploadMemartType.GET_MEMART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                memart: payload
            };
        case uploadMemartType.GET_MEMART_ERROR:
            return {
                ...state,
                isLoading: false,
                memartErrorMessages: payload
            };

        default:
            return state;
    }
};

export default uploadMemartReducer;
