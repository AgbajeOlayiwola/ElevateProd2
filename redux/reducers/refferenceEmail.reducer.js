import { pushDocuments, reffereeType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    reffereeSuccess: null,
    reffereeError: null
};

const refferenceEmailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case reffereeType.REFEREE_START:
            return {
                ...state,
                isLoading: true,
                reffereeSuccess: null,
                pushDocumentsError: null
            };
        case reffereeType.REFEREE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reffereeSuccess: payload
            };
        case reffereeType.REFEREE_ERROR:
            return {
                ...state,
                isLoading: false,
                pushDocumentsError: payload
            };

        default:
            return state;
    }
};

export default refferenceEmailReducer;
