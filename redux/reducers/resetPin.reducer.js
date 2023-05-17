import { resetPin } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    resetPin: null,
    resetPinError: null
};

const resetPinReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case resetPin.RESETPIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                resetPin: null,
                resetPinError: null
            };
        case resetPin.RESETPIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resetPin: payload
            };
        case resetPin.RESETPIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                resetPinError: payload
            };

        default:
            return state;
    }
};

export default resetPinReducer;
