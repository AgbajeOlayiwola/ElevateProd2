import CountryService from '../../services/countries.services';
import actions from './country.action';

export const loadCountryAsync = () => (dispatch) => {
    dispatch(actions.countryLoadStart());
    CountryService.getAllCountries()
        .then((response) =>
            dispatch(actions.countryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(actions.countryLoadError(error.message)));
};
