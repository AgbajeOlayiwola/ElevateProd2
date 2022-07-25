import Services from '../../services/services';
import {
    countryLoadSuccess,
    countryLoadError,
    countryLoadStart
} from '../../actions/actions';

export const loadCountryAsync = () => (dispatch) => {
    dispatch(countryLoadStart());
    Services.getAllCountries()
        .then((response) => dispatch(countryLoadSuccess(response.data.data)))
        .catch((error) => dispatch(countryLoadError(error.message)));
};
