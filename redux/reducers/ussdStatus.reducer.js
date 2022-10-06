import { ussdStatus } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    ussdStatus: null,
    errorMessageussdStatus: null
};

const ussdStatusReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ussdStatus.USSDSTATUS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                ussdStatus: null,
                errorMessageussdStatus: null
            };
        case ussdStatus.USSDSTATUS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ussdStatus: payload
            };
        case ussdStatus.USSDSTATUS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageussdStatus: payload
            };

        default:
            return state;
    }
};

export default ussdStatusReducer;
