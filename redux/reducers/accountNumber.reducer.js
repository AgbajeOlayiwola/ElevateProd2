import { accountNumber } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    accountNumber: [],
    errorMessages: ''
};

const accountNumberReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case accountNumber.ACCOUNTNUMBER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                accountNumber: [],
                errorMessages: ''
            };
        case accountNumber.ACCOUNTNUMBER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountNumber: payload
            };
        case accountNumber.ACCOUNTNUMBER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessages: payload
            };

        default:
            return state;
    }
};

export default accountNumberReducer;
