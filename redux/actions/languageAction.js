//languages action
import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { languages } from '../types/actionTypes';

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
export const loadLanguageAsync = () => (dispatch) => {
    dispatch(languageLoadStart());
    axiosInstance
        .get(`${apiRoutes.getLanguages}`)
        .then((response) => dispatch(languageLoadSuccess(response?.data?.data)))
        .catch((error) => dispatch(languageLoadError(error?.message)));
};

//languagex action end
