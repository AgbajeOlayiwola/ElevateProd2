import { getRC } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getRC: null,
    getRCErrorMessage: null
};

const getRCReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case getRC.GETRC_START:
            return {
                ...state,
                isLoading: true,
                getRC: null,
                getRCErrorMessage: null
            };
        case getRC.GETRC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getRC: payload
            };
        case getRC.GETRC_ERROR:
            return {
                ...state,
                isLoading: false,
                getRCErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getRCReducer;
