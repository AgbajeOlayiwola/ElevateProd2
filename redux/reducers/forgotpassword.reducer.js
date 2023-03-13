import { existingUserProfile, forgotPasswordtype } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    forgotPassword: '',
    forgotPasswordErrorMessages: ''
};

const fogrotPasswordReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case forgotPasswordtype.GET_FORGOT_PASSWORD_START:
            return {
                ...state,
                isLoading: true,
                forgotPassword: [],
                forgotPasswordErrorMessages: ''
            };
        case forgotPasswordtype.GET_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forgotPassword: payload
            };
        case forgotPasswordtype.GET_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                isLoading: false,
                forgotPasswordErrorMessages: payload
            };

        default:
            return state;
    }
};

export default fogrotPasswordReducer;
