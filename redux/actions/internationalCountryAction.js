import apiRoutes from '../helper/apiRoutes';
import { internationalCountry } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//internationalCountry actions
export const internationalCountryLoadStart = () => ({
    type: internationalCountry.INTERNATIONALCOUNTRY_LOAD_START
});

export const internationalCountryLoadSuccess = (countries) => ({
    type: internationalCountry.INTERNATIONALCOUNTRY_LOAD_SUCCESS,
    payload: countries
});

export const internationalCountryLoadError = (errorMessage) => ({
    type: internationalCountry.INTERNATIONALCOUNTRY_LOAD_ERROR,
    payload: errorMessage
});

export const loadinternationalCountry = () => (dispatch) => {
    dispatch(internationalCountryLoadStart());
    axiosInstance
        .get(`${apiRoutes.internationalCountries}`)
        .then((response) =>
            dispatch(internationalCountryLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(internationalCountryLoadError(error?.response?.message))
        );
};
//internationalCountry actions end
