import { airtime } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    airtime: [],
    errorMessage: null
};

const airtimeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case airtime.AIRTIME_LOAD_START:
            return {
                ...state,
                isLoading: true,
                airtime: null,
                errorMessage: null
            };
        case airtime.AIRTIME_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                airtime: payload
            };
        case airtime.AIRTIME_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default airtimeReducer;
