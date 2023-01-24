import { uploadIdDocType, uploadreffereeType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    UploadreffereeSuccess: null,
    UploadreffereeError: null
};

const uploadRefereeFileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadreffereeType.UPLOAD_REFEREE_START:
            return {
                ...state,
                isLoading: true,
                UploadreffereeSuccess: null,
                UploadreffereeError: null
            };
        case uploadreffereeType.UPLOAD_REFEREE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                UploadreffereeSuccess: payload
            };
        case uploadreffereeType.UPLOAD_REFEREE_ERROR:
            return {
                ...state,
                isLoading: false,
                UploadreffereeError: payload
            };

        default:
            return state;
    }
};

export default uploadRefereeFileReducer;
