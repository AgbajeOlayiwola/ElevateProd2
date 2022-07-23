import actionType from './country.actionType';
import initialState from './country.initialState';

const countryReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case actionType.COUNTRY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                countries: null,
                errorMessage: null
            };
        case actionType.COUNTRY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: payload
            };
        case actionType.COUNTRY_LOAD_ERROR:
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
