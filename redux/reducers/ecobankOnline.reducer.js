import { ecobankOnline } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    ecobankOnline: null,
    ecoOnlineErrorMessage: null
};

const ecobankOnlineReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case ecobankOnline.ECOBANKONLINE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                ecobankOnline: null,
                ecoOnlineErrorMessage: null
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
                ecoOnlineErrorMessage: payload
            };

        default:
            return state;
    }
};

export default ecobankOnlineReducer;
