import { country } from '../../types/actionTypes';

const initialState = {
    isLoading: false,
    countries: null,
    errorMessage: null
};

const countryReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case country.COUNTRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                countries: null,
                errorMessage: null
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
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default countryReducer;
