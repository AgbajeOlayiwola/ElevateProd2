import { internationalCountry } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    internationalCountry: null,
    errorData: null
};

const internationalCountryReducer = (
    state = initialState,
    { type, payload }
) => {
    //console.log(payload);÷ss
    switch (type) {
        case internationalCountry.INTERNATIONALCOUNTRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                internationalCountry: null,
                errorData: null
            };
        case internationalCountry.INTERNATIONALCOUNTRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                internationalCountry: payload
            };
        case internationalCountry.INTERNATIONALCOUNTRY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorData: payload
            };

        default:
            return state;
    }
};

export default internationalCountryReducer;
