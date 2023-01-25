import {
    cacDocummentType,
    uploadCacCertType,
    uploadMemartType
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    CacDocumentSuccess: null,
    CacDocumentError: null
};

const cacDocUploadReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case cacDocummentType.CAC_DOCUMENT_START:
            return {
                ...state,
                isLoading: true,
                CacDocumentSuccess: null,
                CacDocumentError: null
            };
        case cacDocummentType.CAC_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                CacDocumentSuccess: payload
            };
        case cacDocummentType.CAC_DOCUMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                CacDocumentError: payload
            };

        default:
            return state;
    }
};

export default cacDocUploadReducer;
