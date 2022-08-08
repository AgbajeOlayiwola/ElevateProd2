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
    completeProfile
} from '../types/actionTypes';
import axios from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';

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

export const loadbank = (code) => (dispatch) => {
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

export const loadbillerCategory = (code) => (dispatch) => {
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
export const loadbillerType = (code, category) => (dispatch) => {
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
export const loadbillerPlan = (code) => (dispatch) => {
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
export const postAirtime = (data) => (dispatch) => {
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
export const postBills = (data) => (dispatch) => {
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
export const accountStatusData = () => (dispatch) => {
    dispatch(accountStatusLoadStart());
    axios
        .get(`${apiRoutes.accountStatus}`)
        .then((response) => dispatch(accountStatusLoadSuccess(response.data)))
        .catch((error) =>
            dispatch(accountStatusLoadError(error.response.data.message))
        );
};

//accountNumber action end

//add user
export const userRegisterStart = (user) => ({
    type: login.REGISTER_SUCCESS,
    payload: user
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
export const createProfileSetup = (profileData) => {
    return async (dispatch) => {
        await axiosInstance
            .post(`${apiRoutes.profileSetupBus}`, profileData)
            .then((response) => {
                dispatch(setupProfileSucces(response.data));
                console.log('data from profile', response.data);
            })
            .catch((error) => {
                console.log(
                    'profile seytup dispatch',
                    error.response.data.message
                );
                dispatch(
                    setupProfileError('error check the fields and try again')
                );
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
export const bvnNinError = (bvnError) => ({
    type: otp.BVN_NIN_LOAD_ERROR,
    payload: bvnError
});
export const bvnNinErrorI = (bvnErrorI) => ({
    type: otp.BVN_NIN_LOAD_ERRORI,
    payload: bvnErrorI
});
export const verifyOtp = (otpData) => {
    return async (dispatch) => {
        await axiosInstance
            .get(`${apiRoutes.verifyStatus}`)
            .then((response) => {
                console.log(response.data.data[0].reason);
                if (
                    response.data.data[0].status === 'SUCCESS' &&
                    response.data.data[1].status === 'SUCCESS'
                ) {
                    axiosInstance
                        .post(`${apiRoutes.verifyOtp}`, otpData)
                        .then((response) => {
                            dispatch(otpLoadSuccess(response.data));
                            console.log('otp', otpData);
                            console.log('data from otp', response.data);
                        })
                        .catch((error) => {
                            console.log('profile otp dispatch', error);
                            dispatch(bvnNinError('error otp does not match'));
                        });
                } else {
                    dispatch(bvnNinError(response.data.data[0].reason));
                    dispatch(bvnNinErrorI(response.data.data[1].reason));
                }
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
