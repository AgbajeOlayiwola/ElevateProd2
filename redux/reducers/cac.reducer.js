import { uploadCacCertType, uploadMemartType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    cac: null,
    cacErrorMessages: null
};

const cacUploadReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case uploadCacCertType.GET_CAC_CERIFICATE_START:
            return {
                ...state,
                isLoading: true,
                cac: null,
                cacErrorMessages: null
            };
        case uploadCacCertType.GET_CAC_CERIFICATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cac: payload
            };
        case uploadCacCertType.GET_CAC_CERIFICATEERROR:
            return {
                ...state,
                isLoading: false,
                cacErrorMessages: payload
            };

        default:
            return state;
    }
};

export default cacUploadReducer;
