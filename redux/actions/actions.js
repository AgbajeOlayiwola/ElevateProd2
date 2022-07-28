import {
    country,
    languages,
    banks,
    billerCategory,
    billerType,
    login
} from '../types/actionTypes';
import Services from '../services/services';
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

export const billerCategoryLoadSuccess = (biller) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_SUCCESS,
    payload: biller
});

export const billerCategoryLoadError = (errorMessage) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_ERROR,
    payload: errorMessage
});

export const loadbillerCategoryAsync = (code) => (dispatch) => {
    dispatch(billerCategoryLoadStart());
    axios
        .get(`${apiRoutes.getBillerCategories}?affiliateCode=${code}`)
        .then((response) =>
            dispatch(billerCategoryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(billerCategoryLoadError(error.message)));
};
//billerCategory actions end

//country actions
export const billerTypeLoadStart = () => ({
    type: billerType.BILLERTYPE_LOAD_START
});

export const billerTypeLoadSuccess = (billers) => ({
    type: billerType.BILLERTYPE_LOAD_SUCCESS,
    payload: billers
});

export const billerTypeLoadError = (errorMessage) => ({
    type: billerType.BILLERTYPE_LOAD_ERROR,
    payload: errorMessage
});
export const loadbillerTypeAsync = (code, category) => (dispatch) => {
    dispatch(billerTypeLoadStart());
    axios
        .get(`${apiRoutes.getBillerType}${code}?category=${category}`)
        .then((response) => dispatch(billerTypeLoadSuccess(response.data.data)))
        .catch((error) => dispatch(billerTypeLoadError(error.message)));
};
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
export const loadLanguageAsync = () => (dispatch) => {
    dispatch(languageLoadStart());
    axios
        .get(`${apiRoutes.getLanguages}`)
        .then((response) => dispatch(languageLoadSuccess(response.data.data)))
        .catch((error) => dispatch(languageLoadError(error.message)));
};

//languagex action end

//add user
export const userRegisterStart = (errorMessage) => ({
    type: login.REGISTER_SUCCESS,
    payload: errorMessage
});
export const userRegisterError = (errorMessage) => ({
    type: login.REGISTER_FAIL,
    payload: errorMessage
});
export const createUserAction = (postData) => {
    return (dispatch) => {
        axios
            .post(`${apiRoutes.register}`, postData)
            .then((response) => {
                console.log('data from action', response.data);
                dispatch(userRegisterStart(response.data.message));
            })
            .catch((error) => {
                dispatch(userRegisterError(error.response.data.error));
            });
    };
};
//add user end

//login User
export const userLoadStart = (errorMessages) => ({
    type: login.LOGIN_SUCCESS,
    payload: errorMessages
});
export const userLoadError = (errorMessages) => ({
    type: login.LOGIN_FAIL,
    payload: errorMessages
});

export const loginUserAction = (loginData) => {
    return (dispatch) => {
        axios
            .post(`${apiRoutes.login}`, loginData)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                // console.log(localStorage);
                dispatch(userLoadStart(response.data.message));
            })
            .catch((error) => {
                dispatch(userLoadError(error.response.data.error));
            });
    };
};
//end login user
