import { bills } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    bills: null,
    errorMessageBills: null
};

const billsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case bills.BILLS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                bills: null,
                errorMessageBills: null
            };
        case bills.BILLS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bills: payload
            };
        case bills.BILLS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageBills: payload
            };

        default:
            return state;
    }
};

export default billsReducer;
