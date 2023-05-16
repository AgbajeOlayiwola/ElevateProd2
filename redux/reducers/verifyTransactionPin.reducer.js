import { accountNumber, verifyTransactionPinType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    verifyTransactionPinSuccess: [],
    verifyTransactionPinErrorMessage: ''
};

const verifyTransactionPinReducer = (
    state = initialState,
    { type, payload }
) => {
    //console.log(payload);÷ss
    switch (type) {
        case verifyTransactionPinType.VERIFY_TTRANSACTIONPIN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                verifyTransactionPinSuccess: [],
                verifyTransactionPinErrorMessage: ''
            };
        case verifyTransactionPinType.VERIFY_TRANSACTIONPIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyTransactionPinSuccess: payload
            };
        case verifyTransactionPinType.VERIFY_TRANSACTIONPIN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                verifyTransactionPinErrorMessage: payload
            };

        default:
            return state;
    }
};

export default verifyTransactionPinReducer;
