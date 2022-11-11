import { omnilite } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    omniliteData: [],
    errorMessage: ''
};

const omniliteReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case omnilite.OMNILITE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                omnilite: [],
                errorMessage: ''
            };
        case omnilite.OMNILITE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                omniliteData: payload
            };
        case omnilite.OMNILITE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default omniliteReducer;
