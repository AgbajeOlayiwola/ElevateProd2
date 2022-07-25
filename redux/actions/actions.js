import {
    country,
    languages,
    banks,
    billerCategory
} from '../types/actionTypes';

import axios from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';

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

export const loadCountryAsync = () => (dispatch) => {
    dispatch(countryLoadStart());
    axios
        .get(`${apiRoutes.getCountries}`)
        .then((response) => dispatch(countryLoadSuccess(response.data.data)))
        .catch((error) => dispatch(countryLoadError(error.message)));
};
//country actions end

//banks actions
export const bankLoadStart = () => ({
    type: banks.BANK_LOAD_START
});

export const bankLoadSuccess = (countries) => ({
    type: banks.BANK_LOAD_SUCCESS,
    payload: countries
});

export const bankLoadError = (errorMessage) => ({
    type: banks.BANK_LOAD_ERROR,
    payload: errorMessage
});

export const loadbankAsync = (code) => (dispatch) => {
    dispatch(bankLoadStart());
    axios
        .get(`${apiRoutes.getBanks}?affiliateCode=${code}`)
        .then((response) => dispatch(bankLoadSuccess(response.data.data)))
        .catch((error) => dispatch(bankLoadError(error.message)));
};
//banks actions end

//billerCategory actions
export const billerCategoryLoadStart = () => ({
    type: billerCategory.BILLERCATEGORY_LOAD_START
});

export const billerCategoryLoadSuccess = (countries) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_SUCCESS,
    payload: countries
});

export const billerCategoryLoadError = (errorMessage) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_ERROR,
    payload: errorMessage
});
//billerCategory actions end

//country actions
// export const bankLoadStart = () => ({
//     type: banks.BANK_LOAD_START
// });

// export const bankLoadSuccess = (countries) => ({
//     type: banks.BANK_LOAD_SUCCESS,
//     payload: countries
// });

// export const bankLoadError = (errorMessage) => ({
//     type: banks.BANK_LOAD_ERROR,
//     payload: errorMessage
// });
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
