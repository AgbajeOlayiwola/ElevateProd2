import { tinType, transactionElevate } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    tinSuccess: null,
    tinError: null
};

const tinReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case tinType.TIN_START:
            return {
                ...state,
                isLoading: true,
                tinSuccess: null,
                tinErro: null
            };
        case tinType.TIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tinSuccess: payload
            };
        case tinType.TIN_ERROR:
            return {
                ...state,
                isLoading: false,
                tinErro: payload
            };

        default:
            return state;
    }
};

export default tinReducer;
