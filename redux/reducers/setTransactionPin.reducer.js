import { setTransactionPin } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    setTransactionPin: null,
    setTransactionPinError: null
};

const setTransactionPinReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case setTransactionPin.SETTRANSACTIONPIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                setTransactionPin: null,
                setTransactionPinError: null
            };
        case setTransactionPin.SETTRANSACTIONPIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                setTransactionPin: payload
            };
        case setTransactionPin.SETTRANSACTIONPIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                setTransactionPinError: payload
            };

        default:
            return state;
    }
};

export default setTransactionPinReducer;
