import {
    validateAccountNumberType,
    validateCardType
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    validateCardSuccess: null,
    validateCardErrorMessage: null
};

const validateCardNumberReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case validateCardType.VALIDATE_CARD_START:
            return {
                ...state,
                isLoading: true,
                validateCardSuccess: null,
                validateCardErrorMessage: null
            };
        case validateCardType.VALIDATE_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                validateCardSuccess: payload
            };
        case validateCardType.VALIDATE_CARD_ERROR:
            return {
                ...state,
                isLoading: false,
                validateCardErrorMessage: payload
            };

        default:
            return state;
    }
};

export default validateCardNumberReducer;
