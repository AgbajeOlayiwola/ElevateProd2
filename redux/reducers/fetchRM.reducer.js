import { fetchRM } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    fetchRM: null,
    fetchRMErrorMessages: null
};

const fetchRMReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case fetchRM.FETCHRM_START:
            return {
                ...state,
                isLoading: true,
                fetchRM: null,
                fetchRMErrorMessages: null
            };
        case fetchRM.FETCHRM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                fetchRM: payload
            };
        case fetchRM.FETCHRM_ERROR:
            return {
                ...state,
                isLoading: false,
                fetchRMErrorMessages: payload
            };

        default:
            return state;
    }
};

export default fetchRMReducer;
