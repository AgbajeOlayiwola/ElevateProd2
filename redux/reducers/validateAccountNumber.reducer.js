import { validateAccountNumberType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    validateAccountNumberSuccess: null,
    validateAccountNumberErrorMessage: null
};

const validateAccountNumberReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case validateAccountNumberType.VALIDATE_ACCOUNT_NUMBER_START:
            return {
                ...state,
                isLoading: true,
                validateAccountNumberSuccess: null,
                validateAccountNumberErrorMessage: null
            };
        case addCardType.ADD_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                validateAccountNumberSuccess: payload
            };
        case addCardType.ADD_CARD_ERROR:
            return {
                ...state,
                isLoading: false,
                validateAccountNumberErrorMessage: payload
            };

        default:
            return state;
    }
};

export default validateAccountNumberReducer;
