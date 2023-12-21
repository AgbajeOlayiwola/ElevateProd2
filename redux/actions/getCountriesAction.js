import apiRoutes from '../helper/apiRoutes';
import { country } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
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

export const loadCountry = () => (dispatch) => {
    dispatch(countryLoadStart());
    axiosInstance
        .get(`${apiRoutes.getCountries}`)
        .then((response) => dispatch(countryLoadSuccess(response?.data?.data)))
        .catch((error) => dispatch(countryLoadError(error?.response?.message)));
};
//country actions end
