import LanguageService from '../../services/language.services';
import actions from './language.action';

export const loadLanguageAsync = () => (dispatch) => {
    dispatch(actions.languageLoadStart());
    LanguageService.getAllLanguages()
        .then((response) =>
            dispatch(actions.languageLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(actions.languageLoadError(error.message)));
};
