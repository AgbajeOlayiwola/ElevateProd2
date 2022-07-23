import actionType from './country.actionType';

const countryLoadStart = () => ({
    type: actionType.COUNTRY_LOAD_START
});

const countryLoadSuccess = (countries) => ({
    type: actionType.COUNTRY_LOAD_SUCCESS,
    payload: countries
});

const countryLoadError = (errorMessage) => ({
    type: actionType.COUNTRY_LOAD_ERROR,
    payload: errorMessage
});

export default {
    countryLoadStart,
    countryLoadSuccess,
    countryLoadError
};
