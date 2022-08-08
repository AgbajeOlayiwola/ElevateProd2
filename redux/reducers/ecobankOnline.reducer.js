import { ecobankOnline } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    ecobankOnline: [],
    errorMessage: ''
};

const ecobankOnlineReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case ecobankOnline.ECOBANKONLINE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                ecobankOnline: [],
                errorMessage: ''
            };
        case ecobankOnline.ECOBANKONLINE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ecobankOnline: payload
            };
        case ecobankOnline.ECOBANKONLINE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default ecobankOnlineReducer;
