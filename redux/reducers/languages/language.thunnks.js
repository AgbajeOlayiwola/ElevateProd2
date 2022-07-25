// import LanguageService from '../../services/language.services';
import {
    languageLoadStart,
    languageLoadSuccess,
    languageLoadError
} from '../../actions/actions';

export const loadLanguageAsync = () => (dispatch) => {
    dispatch(languageLoadStart());
    // LanguageService.getAllLanguages()
    //     .then((response) => dispatch(languageLoadSuccess(response.data.data)))
    //     .catch((error) => dispatch(languageLoadError(error.message)));
};
