import { changeTransactionPin } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    changeTransactionPin: null,
    changeTransactionPinError: null
};

const changeTransactionPinReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                changeTransactionPin: null,
                changeTransactionPinError: null
            };
        case changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                changeTransactionPin: payload
            };
        case changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                changeTransactionPinError: payload
            };

        default:
            return state;
    }
};

export default changeTransactionPinReducer;
