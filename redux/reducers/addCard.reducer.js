import {
    accountPrimary,
    addCardType,
    addomniLiteType
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    addCardSuccess: null,
    addCardErrorMessage: null
};

const addCardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case addCardType.ADD_CARD_START:
            return {
                ...state,
                isLoading: true,
                addCardSuccess: null,
                addCardErrorMessage: null
            };
        case addCardType.ADD_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addOmniliteSuccess: payload
            };
        case addCardType.ADD_CARD_ERROR:
            return {
                ...state,
                isLoading: false,
                addCardErrorMessage: payload
            };

        default:
            return state;
    }
};

export default addCardReducer;
