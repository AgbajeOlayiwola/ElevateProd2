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
    interBankEnquiry,
    balanceEnquiry,
    transactionHistory,
    transactionElevate,
    postBeneficiaries,
    getBeneficiaries,
    bulkTransfer,
    internationalTransfer,
    verifyBank,
    verifyCurrency,
    login,
    otp,
    compProfile,
    setupProfile,
    omnilite,
    accountNumber,
    existingUserProfile,
    ecobankOnline,
    createAccount,
    accountStatus,
    completeProfile,
    newUserCreateAccount,
    getNewUserAccount,
    businessCategories
} from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
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

export const loadCountry = () => (dispatch) => {
    dispatch(countryLoadStart());
    axiosInstance
        .get(`${apiRoutes.getCountries}`)
        .then((response) => dispatch(countryLoadSuccess(response.data.data)))
        .catch((error) =>
            dispatch(countryLoadError(error.response.data.message))
        );
};
//country actions end

//businessCategories actions
export const businessCategoriesLoadStart = () => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_START
});

export const businessCategoriesLoadSuccess = (countries) => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_SUCCESS,
    payload: countries
});

export const businessCategoriesLoadError = (errorMessage) => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_ERROR,
    payload: errorMessage
});

export const businessCategoriesData = () => (dispatch) => {
    dispatch(businessCategoriesLoadStart());
    axiosInstance
        .get(`${apiRoutes.businessCategories}`)
        .then((response) =>
            dispatch(businessCategoriesLoadSuccess(response.data.data))
        )
        .catch((error) =>
            dispatch(businessCategoriesLoadError(error.response.data.message))
        );
};
//businessCategories actions end

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

export const loadbank = (code) => (dispatch) => {
    dispatch(bankLoadStart());
    axiosInstance
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

export const loadbillerCategory = (code) => (dispatch) => {
    dispatch(billerCategoryLoadStart());
    axiosInstance
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
export const loadbillerType = (code, category) => (dispatch) => {
    dispatch(billerTypeLoadStart());
    axiosInstance
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
export const loadbillerPlan = (code) => (dispatch) => {
    dispatch(billerPlanLoadStart());
    axiosInstance
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
    axiosInstance
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
export const postAirtime = (data) => (dispatch) => {
    dispatch(airtimeLoadStart());
    axiosInstance
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
export const postBills = (data) => (dispatch) => {
    dispatch(billsLoadStart());
    axiosInstance
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
    axiosInstance
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
    axiosInstance
        .post(`${apiRoutes.interBank}`, data)
        .then((response) => dispatch(interBankLoadSuccess(response.data)))
        .catch((error) => dispatch(interBankLoadError(error.message)));
};

//interBank action end

//interBankEnquiry action
export const interBankEnquiryLoadStart = () => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_START
});

export const interBankEnquiryLoadSuccess = (bill) => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_SUCCESS,
    payload: bill
});

export const interBankEnquiryLoadError = (interBankEnquiryerror) => ({
    type: interBankEnquiry.INTERBANKENQUIRY_LOAD_ERROR,
    payload: interBankEnquiryerror
});
export const postInterBankEnquiry = (data) => (dispatch) => {
    dispatch(interBankEnquiryLoadStart());
    axiosInstance
        .post(`${apiRoutes.interBankEnquiry}`, data)
        .then((response) =>
            dispatch(interBankEnquiryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(interBankEnquiryLoadError(error.message)));
};

//interBankEnquiry action end

//balanceEnquiry action
export const balanceEnquiryLoadStart = () => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_START
});

export const balanceEnquiryLoadSuccess = (bill) => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_SUCCESS,
    payload: bill
});

export const balanceEnquiryLoadError = (balanceEnquiryerror) => ({
    type: balanceEnquiry.BALANCEENQUIRY_LOAD_ERROR,
    payload: balanceEnquiryerror
});
export const getBalanceEnquiry = () => (dispatch) => {
    dispatch(balanceEnquiryLoadStart());
    axiosInstance
        .get(`${apiRoutes.balanceEnquiry}`)
        .then((response) =>
            dispatch(balanceEnquiryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(balanceEnquiryLoadError(error.message)));
};

//balanceEnquiry action end

//transactionHistory action
export const transactionHistoryLoadStart = () => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_START
});

export const transactionHistoryLoadSuccess = (bill) => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_SUCCESS,
    payload: bill
});

export const transactionHistoryLoadError = (transactionHistoryerror) => ({
    type: transactionHistory.TRANSACTIONHISTORY_LOAD_ERROR,
    payload: transactionHistoryerror
});
export const getTransactionHistory = () => (dispatch) => {
    dispatch(transactionHistoryLoadStart());
    axiosInstance
        .get(`${apiRoutes.transactionHistory}`)
        .then((response) =>
            dispatch(transactionHistoryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(transactionHistoryLoadError(error.message)));
};

//transactionHistory action end

//transactionElevate action
export const transactionElevateLoadStart = () => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_START
});

export const transactionElevateLoadSuccess = (bill) => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_SUCCESS,
    payload: bill
});

export const transactionElevateLoadError = (transactionElevateerror) => ({
    type: transactionElevate.TRANSACTIONELEVATE_LOAD_ERROR,
    payload: transactionElevateerror
});
export const getTransactionElevate = () => (dispatch) => {
    dispatch(transactionElevateLoadStart());
    axiosInstance
        .get(`${apiRoutes.transactionElevate}`)
        .then((response) =>
            dispatch(transactionElevateLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(transactionElevateLoadError(error.message)));
};

//transactionElevate action end

//transactionHistory action
export const bulkTransferLoadStart = () => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_START
});

export const bulkTransferLoadSuccess = (bill) => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_SUCCESS,
    payload: bill
});

export const bulkTransferLoadError = (bulkTransfererror) => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_ERROR,
    payload: bulkTransfererror
});
export const getBulkTransfer = (data) => (dispatch) => {
    dispatch(bulkTransferLoadStart());
    axiosInstance
        .post(`${apiRoutes.bulkTransfer}`, data)
        .then((response) =>
            dispatch(bulkTransferLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(bulkTransferLoadError(error.message)));
};

//transactionHistory action end

//internationalTransfer action
export const internationalTransferLoadStart = () => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_START
});

export const internationalTransferLoadSuccess = (bill) => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_SUCCESS,
    payload: bill
});

export const internationalTransferLoadError = (internationalTransfererror) => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_ERROR,
    payload: internationalTransfererror
});
export const getInternationalTransfer = (data) => (dispatch) => {
    dispatch(internationalTransferLoadStart());
    axiosInstance
        .post(`${apiRoutes.internationalTransfer}`, data)
        .then((response) =>
            dispatch(internationalTransferLoadSuccess(response.data.data))
        )
        .catch((error) =>
            dispatch(internationalTransferLoadError(error.message))
        );
};

//internationalTransfer action end

//verifyBank action
export const verifyBankLoadStart = () => ({
    type: verifyBank.VERIFYBANK_LOAD_START
});

export const verifyBankLoadSuccess = (bill) => ({
    type: verifyBank.VERIFYBANK_LOAD_SUCCESS,
    payload: bill
});

export const verifyBankLoadError = (verifyBankerror) => ({
    type: verifyBank.VERIFYBANK_LOAD_ERROR,
    payload: verifyBankerror
});
export const getverifyBank = (data) => (dispatch) => {
    dispatch(verifyBankLoadStart());
    axiosInstance
        .post(`${apiRoutes.verifyBank}`, data)
        .then((response) => dispatch(verifyBankLoadSuccess(response.data.data)))
        .catch((error) => dispatch(verifyBankLoadError(error.message)));
};

//verifyBank action end

//verifyCurrency action
export const verifyCurrencyLoadStart = () => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_START
});

export const verifyCurrencyLoadSuccess = (bill) => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_SUCCESS,
    payload: bill
});

export const verifyCurrencyLoadError = (verifyCurrencyerror) => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_ERROR,
    payload: verifyCurrencyerror
});
export const getVerifyCurrency = (data) => (dispatch) => {
    dispatch(verifyCurrencyLoadStart());
    axiosInstance
        .post(`${apiRoutes.verifyCurrency}`, data)
        .then((response) =>
            dispatch(verifyCurrencyLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(verifyCurrencyLoadError(error.message)));
};

//verifyCurrency action end

//getBeneficiaries action
export const getBeneficiariesLoadStart = () => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_START
});

export const getBeneficiariesLoadSuccess = (bill) => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const getBeneficiariesLoadError = (getBeneficiarieserror) => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_ERROR,
    payload: getBeneficiarieserror
});
export const getBeneficiariesData = () => (dispatch) => {
    dispatch(getBeneficiariesLoadStart());
    axiosInstance
        .get(`${apiRoutes.beneficiaries}`)
        .then((response) =>
            dispatch(getBeneficiariesLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(getBeneficiariesLoadError(error.message)));
};

//getBeneficiaries action end

//postBeneficiaries action
export const postBeneficiariesLoadStart = () => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_START
});

export const postBeneficiariesLoadSuccess = (bill) => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const postBeneficiariesLoadError = (postBeneficiarieserror) => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_ERROR,
    payload: postBeneficiarieserror
});
export const postBeneficiariesData = (data) => (dispatch) => {
    dispatch(postBeneficiariesLoadStart());
    axiosInstance
        .post(`${apiRoutes.beneficiaries}`, data)
        .then((response) =>
            dispatch(postBeneficiariesLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(postBeneficiariesLoadError(error.message)));
};

//postBeneficiaries action end

//omnilite action
export const omniliteLoadStart = () => ({
    type: omnilite.OMNILITE_LOAD_START
});

export const omniliteLoadSuccess = (bill) => ({
    type: omnilite.OMNILITE_LOAD_SUCCESS,
    payload: bill
});

export const omniliteLoadError = (errorMessage) => ({
    type: omnilite.OMNILITE_LOAD_ERROR,
    payload: errorMessage
});
export const omniliteData = (data) => (dispatch) => {
    dispatch(omniliteLoadStart());
    axiosInstance
        .post(`${apiRoutes.omnilite}`, data)
        .then((response) => dispatch(omniliteLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(omniliteLoadError(error.response.data.message))
        );
};

//omnilite action end

//ecobankOnline action
export const ecobankOnlineLoadStart = () => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_START
});

export const ecobankOnlineLoadSuccess = (bill) => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_SUCCESS,
    payload: bill
});

export const ecobankOnlineLoadError = (errorMessage) => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_ERROR,
    payload: errorMessage
});
export const ecobankOnlineData = (data) => (dispatch) => {
    dispatch(ecobankOnlineLoadStart());
    axiosInstance
        .post(`${apiRoutes.ecobankOnline}`, data)
        .then((response) => dispatch(ecobankOnlineLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(ecobankOnlineLoadError(error.response.data.message))
        );
};

//ecobankOnline action end

//accountNumber action
export const accountNumberLoadStart = () => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_START
});

export const accountNumberLoadSuccess = (bill) => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_SUCCESS,
    payload: bill
});

export const accountNumberLoadError = (errorMessages) => ({
    type: accountNumber.ACCOUNTNUMBER_LOAD_ERROR,
    payload: errorMessages
});
export const accountNumberData = (data) => (dispatch) => {
    dispatch(accountNumberLoadStart());
    axiosInstance
        .post(`${apiRoutes.accountNumber}`, data)
        .then((response) => dispatch(accountNumberLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(accountNumberLoadError(error.response.data.message))
        );
};

//accountNumber action end

//existingUserProfile action
export const existingUserProfileLoadStart = () => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_START
});

export const existingUserProfileLoadSuccess = (bill) => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_SUCCESS,
    payload: bill
});

export const existingUserProfileLoadError = (errorMessage) => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_ERROR,
    payload: errorMessage
});
export const existingUserProfileData = (data) => (dispatch) => {
    dispatch(existingUserProfileLoadStart());
    axiosInstance
        .post(`${apiRoutes.existingUserProfile}`, data)
        .then((response) =>
            dispatch(existingUserProfileLoadSuccess(response.data))
        )
        .catch((error) =>
            dispatch(existingUserProfileLoadError(error.response.data.message))
        );
};

//accountNumber action end

//createAccount action
export const createAccountLoadStart = () => ({
    type: createAccount.CREATEACCOUNT_LOAD_START
});

export const createAccountLoadSuccess = (bill) => ({
    type: createAccount.CREATEACCOUNT_LOAD_SUCCESS,
    payload: bill
});

export const createAccountLoadError = (errorData) => ({
    type: createAccount.CREATEACCOUNT_LOAD_ERROR,
    payload: errorData
});
export const createAccountData = (data) => (dispatch) => {
    dispatch(createAccountLoadStart());
    axiosInstance
        .post(`${apiRoutes.createAccount}`, data)
        .then((response) => dispatch(createAccountLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(createAccountLoadError(error.response.data.message))
        );
};

//accountNumber action end

//accountStatus action
export const accountStatusLoadStart = () => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_START
});

export const accountStatusLoadSuccess = (bill) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_SUCCESS,
    payload: bill
});

export const accountStatusLoadError = (errorMessages) => ({
    type: accountStatus.ACCOUNTSTATUS_LOAD_ERROR,
    payload: errorMessages
});
export const accountStatusData = (data) => (dispatch) => {
    dispatch(accountStatusLoadStart());
    axiosInstance
        .get(`${apiRoutes.accountStatus}/${data}`)
        .then((response) => dispatch(accountStatusLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(accountStatusLoadError(error.response.data.message))
        );
};

//accountNumber action end

//add user
export const userRegisterStart = (user) => ({
    type: login.REGISTER_START
});
export const userRegisterSucess = (user) => ({
    type: login.REGISTER_SUCCESS,
    payload: user
});
export const userRegisterError = (errorMessage) => ({
    type: login.REGISTER_FAIL,
    payload: errorMessage
});
export const createUserAction = (postData) => {
    return (dispatch) => {
        dispatch(userRegisterStart());
        axiosInstance
            .post(`${apiRoutes.register}`, postData)
            .then((response) => {
                console.log('data from action', response.data);
                dispatch(userRegisterSucess(response.data.message));
            })
            .catch((error) => {
                dispatch(userRegisterError(error.response.data.message));
            });
    };
};
//add user end

//login User
export const userLoadStart = () => ({
    type: login.LOGIN_START
});

export const userLoadSuccess = (errorMessages) => ({
    type: login.LOGIN_SUCCESS,
    payload: errorMessages
});
export const userLoadError = (errorMessages) => ({
    type: login.LOGIN_FAIL,
    payload: errorMessages
});

export const loginUserAction = (loginData) => {
    return (dispatch) => {
        dispatch(userLoadStart());
        axiosInstance
            .post(`${apiRoutes.login}`, loginData)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem(
                    'token',
                    JSON.stringify(response.data.data.token)
                );

                dispatch(userLoadSuccess(response.data.message));
            })
            .catch((error) => {
                console.log(error);
                dispatch(userLoadError(error.response.data.message));
            });
    };
};

// const getConfig = () => {
//     try {
//         let token = localStorage.getItem('token');
//         console.log(token);
//         return {
//             headers: { Authorization: `Bearer ${token}` }
//         };
//     } catch (error) {
//         console.log('getConfig error', error);
//         let token = JSON.parse(localStorage.getItem('token'));
//         console.log(token);
//         return {
//             headers: { Authorization: token }
//         };
//     } catch (error) {
//         console.log('get config error', error);
//     }
// };

//end login user

//profile setup action start
export const setupProfileStart = (errorMessages) => ({
    type: setupProfile.PROFILESETUP_LOAD_START,
    payload: errorMessages
});
export const setupProfileSucces = (profileSetup) => ({
    type: setupProfile.PROFILESETUP_LOAD_SUCCESS,
    payload: profileSetup
});
export const setupProfileError = (errorMessages) => ({
    type: setupProfile.PROFILESETUP_LOAD_ERROR,
    payload: errorMessages
});
export const bvnNinError = (bvnError) => ({
    type: setupProfile.BVN_NIN_LOAD_ERROR,
    payload: bvnError
});
export const bvnNinErrorI = (bvnErrorI) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORI,
    payload: bvnErrorI
});
export const bvnNinErrorII = (bvnErrorII) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORII,
    payload: bvnErrorII
});
export const bvnNinErrorIII = (bvnErrorIII) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORIII,
    payload: bvnErrorIII
});
export const bvnNinPending = (bvnNinPend) => ({
    type: setupProfile.BVN_NIN_LOAD_PENDING,
    payload: bvnNinPend
});
export const bvnNinData = (bvnNin) => ({
    type: setupProfile.BVN_NIN_LOAD_SUCCESS,
    payload: bvnNin
});
export const createProfileSetup = (profileData) => {
    return async (dispatch) => {
        await axiosInstance
            .post(`${apiRoutes.profileSetupBus}`, profileData)
            .then((response) => {
                dispatch(setupProfileSucces(response.data));

                console.log('data from profile', response.data);
                if (response.data.message === 'Profile setup successful') {
                    axiosInstance
                        .get(`${apiRoutes.verifyStatus}`)
                        .then((response) => {
                            dispatch(bvnNinData(response.data));
                            if (response.data.data[0].reason) {
                                dispatch(
                                    bvnNinError(
                                        'We are unable to verify your details at the momemnt. Try again later'
                                    )
                                );
                            }
                            if (response.data.data[1].reason) {
                                dispatch(
                                    bvnNinErrorI(
                                        'We are unable to verify your details at the momemnt. Try again later'
                                    )
                                );
                            }
                            if (response.data.data[1].status === 'PENDING') {
                                dispatch(bvnNinPending('Try Again'));
                            } else {
                                dispatch(bvnNinPending(null));
                            }
                            console.log(response.data.data[0].reason);
                        })
                        .catch((error) => {
                            console.log('profile otp dispatch', error);
                            dispatch(bvnNinError(error.response.message));
                        });
                }
            })
            .catch((error) => {
                console.log(
                    'profile seytup dispatch',
                    error.response.data.message
                );
                dispatch(setupProfileError(error.response.data.message));
            });
    };
};

// profile setuo action end
//BVN Otp
export const otpLoadStart = (errorMessages) => ({
    type: otp.OTP_LOAD_START,
    payload: errorMessages
});
export const otpLoadSuccess = (otpActData) => ({
    type: otp.OTP_LOAD_SUCCESS,
    payload: otpActData
});
export const otpLoadError = (otpErrorMessage) => ({
    type: otp.OTP_LOAD_ERROR,
    payload: otpErrorMessage
});

export const verifyOtp = (otpData) => {
    return async (dispatch) => {
        await axiosInstance
            .post(`${apiRoutes.verifyOtp}`, otpData)
            .then((response) => {
                dispatch(otpLoadSuccess(response.data));
                console.log('otp', otpData);
                console.log('data from otp', response.data);
            })
            .catch((error) => {
                console.log('profile otp dispatch', error);
                dispatch(bvnNinError(error.response.message));
            })
            .catch((error) => {
                console.log('profile Bvn dispatch', error.response);
            });
    };
};

//BVN OTP End

//Complete Profile Action
export const profileLoadStart = (errorMessages) => ({
    type: compProfile.PROFILE_LOAD_START,
    payload: errorMessages
});
export const profileLoadSuccess = (profile) => ({
    type: compProfile.PROFILE_LOAD_SUCCESS,
    payload: profile
});
export const profileLoadError = (errorMessages) => ({
    type: login.PROFILE_LOAD_ERROR,
    payload: errorMessages
});

export const CompProfile = () => {
    return (dispatch) => {
        dispatch(profileLoadStart());
        axiosInstance
            .get(`${apiRoutes.authProfile}`)
            .then((response) => {
                dispatch(profileLoadSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

//Commplete Profile End

//Complete Profile post
export const completeProfileLoadStart = (errorMessages) => ({
    type: completeProfile.COMP_PROFILE_LOAD_START,
    payload: errorMessages
});
export const completeProfileLoadSuccess = (compBusprofile) => ({
    type: completeProfile.COMP_PROFILE_LOAD_SUCCESS,
    payload: compBusprofile
});
export const completeProfileLoadError = (errorMessage) => ({
    type: completeProfile.COMP_PROFILE_LOAD_ERROR,
    payload: errorMessage
});

export const CompleteBusinessProfile = (completeProfileData) => {
    return (dispatch) => {
        // dispatch(completeProfileLoadStart());
        axiosInstance
            .patch(`${apiRoutes.completesBusinessProfile}`, completeProfileData)
            .then((response) => {
                console.log('complete business profiler', response.data);
                dispatch(completeProfileLoadSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    completeProfileLoadError(
                        'error check the fields and try again'
                    )
                );
            });
    };
};
//Complete Profile Post End

//Create New User Action
export const createNewAccountStart = () => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_START,
    payload: newAccountErrorMessage
});
export const createNewAccountSuccess = (newAccount) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_SUCCESS,
    payload: newAccount
});
export const createNewAccountError = (newAccountErrorMessage) => ({
    type: newUserCreateAccount.CREATE_NEW_ACCOUNT_LOAD_ERROR,
    payload: newAccountErrorMessage
});

export const createNewUserAccount = (accountData) => {
    return (dispatch) => {
        // dispatch(completeProfileLoadStart());
        axiosInstance
            .post(`${apiRoutes.newCreateAccount}`, accountData)
            .then((response) => {
                console.log('create New Account', response.data);
                dispatch(createNewAccountSuccess(response.data));
            })
            .catch((error) => {
                console.log('create new account:', error.response.data.message);
                dispatch(createNewAccountError(error.response.data.message));
            });
    };
};

//End Create New User Action

//start account status

export const getNewAccountStart = () => ({
    type: getNewUserAccount.GET_NEW_ACCOUNT_LOAD_START,
    payload: ''
});
export const getNewAccountSuccess = (newUserAccount) => ({
    type: getNewUserAccount.GET_NEW_ACCOUNT_LOAD_SUCCESS,
    payload: newUserAccount
});
export const getNewAccountError = (newUserAccountErrorMessage) => ({
    type: getNewUserAccount.GET_NEW_ACCOUNT_LOAD_ERROR,
    payload: newUserAccountErrorMessage
});

export const getNewUserAccountDetails = (accountData) => {
    return (dispatch) => {
        // dispatch(completeProfileLoadStart());
        // dispatch(getNewAccountStart());
        axiosInstance
            .get(`${apiRoutes.accountStatus}`)
            .then((response) => dispatch(getNewAccountSuccess(response.data)))
            .catch((error) =>
                dispatch(getNewAccountError(error.response.data.message))
            );
    };
};
//end account status
