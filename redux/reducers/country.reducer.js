import { country } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    countries: null,
    errorData: null
};

const countryReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case country.COUNTRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                countries: null,
                errorData: null
            };
        case country.COUNTRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: payload
            };
        case country.COUNTRY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorData: payload
            };

        default:
            return state;
    }
};

export default countryReducer;
