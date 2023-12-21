import { checkStatus } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    checkStatus: null,
    errorMessageCheck: null
};

const checkStatusReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case checkStatus.CHECKSTATUS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                checkStatus: null,
                errorMessageCheck: null
            };
        case checkStatus.CHECKSTATUS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                checkStatus: payload
            };
        case checkStatus.CHECKSTATUS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageCheck: payload
            };

        default:
            return state;
    }
};

export default checkStatusReducer;
