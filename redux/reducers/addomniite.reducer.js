import { accountPrimary, addomniLiteType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    addOmniliteSuccess: null,
    addOmniliteErrorMessage: null
};

const addOmniliteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case addomniLiteType.OMNILITE_TYPE_START:
            return {
                ...state,
                isLoading: true,
                addOmniliteSuccess: null,
                addOmniliteErrorMessage: null
            };
        case addomniLiteType.OMNILITE_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addOmniliteSuccess: payload
            };
        case addomniLiteType.OMNILITE_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                addOmniliteErrorMessage: payload
            };

        default:
            return state;
    }
};

export default addOmniliteReducer;
