import { addressVerificationType, airtime } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    addressVerificationSuc: null,
    addressVerificationsError: null
};

const addressVerificationReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case addressVerificationType.ADDRESS_VERIFICATION_START:
            return {
                ...state,
                isLoading: true,
                addressVerificationSuc: null,
                addressVerificationsError: null
            };
        case addressVerificationType.ADDRESS_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addressVerificationSuc: payload
            };
        case addressVerificationType.ADDRESS_VERIFICATION_ERROR:
            return {
                ...state,
                isLoading: false,
                addressVerificationsError: payload
            };

        default:
            return state;
    }
};

export default addressVerificationReducer;
