import { banks } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    banks: null,
    errorMessage: null
};

const banksReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case banks.BANK_LOAD_START:
            return {
                ...state,
                isLoading: true,
                banks: null,
                errorMessage: null
            };
        case banks.BANK_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                banks: payload
            };
        case banks.BANK_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default banksReducer;
