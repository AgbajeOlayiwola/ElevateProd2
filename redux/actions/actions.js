import {
    country,
    languages,
    banks,
    billerCategory,
    billerType,
    billerPlan,
    airtime,
    bills,
    internalBank,
    interBank,
    login
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
        .catch((error) =>
            dispatch(countryLoadError(error.response.data.message))
        );
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

//country actions
export const billerPlanLoadStart = () => ({
    type: billerPlan.BILLERPLAN_LOAD_START
});

export const billerPlanLoadSuccess = (billers) => ({
    type: billerPlan.BILLERPLAN_LOAD_SUCCESS,
    payload: billers
});

export const billerPlanLoadError = (errorMessage) => ({
    type: billerPlan.BILLERPLAN_LOAD_ERROR,
    payload: errorMessage
});
export const loadbillerPlanAsync = (code) => (dispatch) => {
    dispatch(billerPlanLoadStart());
    axios
        .get(`${apiRoutes.getBillerPlan}${code}`)
        .then((response) => dispatch(billerPlanLoadSuccess(response.data.data)))
        .catch((error) => dispatch(billerPlanLoadError(error.message)));
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

//airtime action
export const airtimeLoadStart = () => ({
    type: airtime.AIRTIME_LOAD_START
});

export const airtimeLoadSuccess = (airtimes) => ({
    type: airtime.AIRTIME_LOAD_SUCCESS,
    payload: airtimes
});

export const airtimeLoadError = (errorMessageAirtime) => ({
    type: airtime.AIRTIME_LOAD_ERROR,
    payload: errorMessageAirtime
});
export const postAirtimeAsync = (data) => (dispatch) => {
    dispatch(airtimeLoadStart());
    axios
        .post(`${apiRoutes.airtime}`, data)
        .then((response) => dispatch(airtimeLoadSuccess(response.data)))
        .catch((error) => dispatch(airtimeLoadError(error.message)));
};

//airtime action end

//bills action
export const billsLoadStart = () => ({
    type: bills.BILLS_LOAD_START
});

export const billsLoadSuccess = (bill) => ({
    type: bills.BILLS_LOAD_SUCCESS,
    payload: bill
});

export const billsLoadError = (errorMessageBills) => ({
    type: bills.BILLS_LOAD_ERROR,
    payload: errorMessageBills
});
export const postBillsAsync = (data) => (dispatch) => {
    dispatch(billsLoadStart());
    axios
        .post(`${apiRoutes.bills}`, data)
        .then((response) => dispatch(billsLoadSuccess(response.data.data)))
        .catch((error) => dispatch(billsLoadError(error.response.data.error)));
};

//bills action end

//internalBank action
export const internalBankLoadStart = () => ({
    type: internalBank.INTERNALBANK_LOAD_START
});

export const internalBankLoadSuccess = (bill) => ({
    type: internalBank.INTERNALBANK_LOAD_SUCCESS,
    payload: bill
});

export const internalBankLoadError = (internalBankerror) => ({
    type: internalBank.INTERNALBANK_LOAD_ERROR,
    payload: internalBankerror
});
export const postInternalBank = (data) => (dispatch) => {
    dispatch(internalBankLoadStart());
    axios
        .post(`${apiRoutes.internalBank}`, data)
        .then((response) =>
            dispatch(internalBankLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(internalBankLoadError(error.message)));
};

//internalBank action end

//interBank action
export const interBankLoadStart = () => ({
    type: interBank.INTERBANK_LOAD_START
});

export const interBankLoadSuccess = (bill) => ({
    type: interBank.INTERBANK_LOAD_SUCCESS,
    payload: bill
});

export const interBankLoadError = (interBankerror) => ({
    type: interBank.INTERBANK_LOAD_ERROR,
    payload: interBankerror
});
export const postInterBank = (data) => (dispatch) => {
    dispatch(interBankLoadStart());
    axios
        .post(`${apiRoutes.interBank}`, data)
        .then((response) => dispatch(interBankLoadSuccess(response.data.data)))
        .catch((error) => dispatch(interBankLoadError(error.message)));
};

//interBank action end

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
                dispatch(userRegisterError(error.response.data.message));
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
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem(
                    'token',
                    JSON.stringify(response.data.data.token)
                );

                dispatch(userLoadStart(response.data.message));
            })
            .catch((error) => {
                console.log(error);
                dispatch(userLoadError(error.response.data.message));
            });
    };
};

const getConfig = () => {
    try {
        let token = localStorage.getItem('token');
        console.log(token);
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    } catch (error) {
        console.log('getConfig error', error);
    }
};

//end login user

//profile setup action start

export const createProfileSetup = (profileData) => {
    return (dispatch) => {
        const config = getConfig();
        axios
            .post(`${apiRoutes.profileSetupBus}`, profileData, config)
            .then((response) => {
                console.log('data from profile', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// profile setuo action end
