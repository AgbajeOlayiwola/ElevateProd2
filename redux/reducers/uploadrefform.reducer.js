import { uploadRefferenceFormType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    uploadRefForm: null,
    uploadRefFormErrorMessages: null
};

const uploadRefReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_START:
            return {
                ...state,
                isLoading: true,
                uploadRefForm: null,
                uploadRefFormErrorMessages: null
            };
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shareRefForm: payload
            };
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_ERROR:
            return {
                ...state,
                isLoading: false,
                uploadRefFormErrorMessages: payload
            };

        default:
            return state;
    }
};

export default uploadRefReducer;
