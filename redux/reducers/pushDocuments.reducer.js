import { pushDocuments } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    pushDocuments: null,
    pushDocumentsError: null
};

const pushDocumentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case pushDocuments.PUSHDOCUMENTS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                pushDocuments: null,
                pushDocumentsError: null
            };
        case pushDocuments.PUSHDOCUMENTS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pushDocuments: payload
            };
        case pushDocuments.PUSHDOCUMENTS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                pushDocumentsError: payload
            };

        default:
            return state;
    }
};

export default pushDocumentsReducer;
