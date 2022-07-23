import actionType from './language.actionType';

const languageLoadStart = () => ({
    type: actionType.LANGUAGE_LOAD_START
});

const languageLoadSuccess = (language) => ({
    type: actionType.LANGUAGE_LOAD_SUCCESS,
    payload: language
});

const languageLoadError = (errorMessage) => ({
    type: actionType.LANGUAGE_LOAD_ERROR,
    payload: errorMessage
});

export default {
    languageLoadStart,
    languageLoadSuccess,
    languageLoadError
};
