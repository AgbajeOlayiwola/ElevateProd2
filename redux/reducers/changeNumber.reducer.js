import { changeNumber } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    changeNumber: null,
    changeNumberError: null
};

const changeNumberReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case changeNumber.CHANGENUMBER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                changeNumbers: null,
                changeNumberError: null
            };
        case changeNumber.CHANGENUMBER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                changeNumber: payload
            };
        case changeNumber.CHANGENUMBER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                changeNumberError: payload
            };

        default:
            return state;
    }
};

export default changeNumberReducer;
