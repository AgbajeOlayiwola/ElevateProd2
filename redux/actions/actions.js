import { country, languages } from '../types/actionTypes';

//country actions
export const countryLoadStart = () => ({
    type: country.COUNTRY_LOAD_START
});

export const countryLoadSuccess = (countries) => ({
    type: country.COUNTRY_LOAD_SUCCESS,
    payload: countries
});

export const countryLoadError = (errorMessage) => ({
    type: country.COUNTRY_LOAD_ERROR,
    payload: errorMessage
});
//country actions end

//languages action

export const languageLoadStart = () => ({
    type: languages.LANGUAGE_LOAD_START
});

export const languageLoadSuccess = (language) => ({
    type: languages.LANGUAGE_LOAD_SUCCESS,
    payload: language
});

export const languageLoadError = (errorMessage) => ({
    type: languages.LANGUAGE_LOAD_ERROR,
    payload: errorMessage
});

//languagex action end
