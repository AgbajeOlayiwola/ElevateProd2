import { uploadRefferenceFormType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    uploadBoardRes: null,
    uploadRefFormErrorMessages: null
};

const uploadBoardResReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_START:
            return {
                ...state,
                isLoading: true,
                uploadBoardRes: null,
                uploadBoardResErrorMessages: null
            };
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                uploadBoardRes: payload
            };
        case uploadRefferenceFormType.GET_REFFERENCE_FORM_ERROR:
            return {
                ...state,
                isLoading: false,
                uploadBoardResErrorMessages: payload
            };

        default:
            return state;
    }
};

export default uploadBoardResReducer;
