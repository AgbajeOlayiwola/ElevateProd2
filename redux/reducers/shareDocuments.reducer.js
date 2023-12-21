import { shareDocuments } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    shareDocuments: null,
    shareDocumentsError: null
};

const shareDocumentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case shareDocuments.SHAREDOCUMENTS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                shareDocuments: null,
                shareDocumentsError: null
            };
        case shareDocuments.SHAREDOCUMENTS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shareDocuments: payload
            };
        case shareDocuments.SHAREDOCUMENTS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                shareDocumentsError: payload
            };

        default:
            return state;
    }
};

export default shareDocumentsReducer;
