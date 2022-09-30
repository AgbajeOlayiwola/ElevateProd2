import { uploadUtilityDocumentype } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    utilityUpload: null,
    utilityUplodaErrorMessages: null
};

const utilityUploadReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_START:
            return {
                ...state,
                isLoading: true,
                utilityUpload: null,
                utilityUplodaErrorMessages: null
            };
        case uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                utilityUpload: payload
            };
        case uploadUtilityDocumentype.GET_UTILITY_DOCUMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                utilityUplodaErrorMessages: payload
            };

        default:
            return state;
    }
};

export default utilityUploadReducer;
