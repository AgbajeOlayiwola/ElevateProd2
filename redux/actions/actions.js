import {
    country,
    internationalCountry,
    languages,
    checkStatus,
    banks,
    logout,
    billerCategory,
    billerType,
    billerPlan,
    airtime,
    airtimeNetwork,
    bills,
    internalBank,
    interBank,
    interBankEnquiry,
    intraBankEnquiry,
    balanceEnquiry,
    transactionHistory,
    transactionFees,
    transactionElevate,
    postBeneficiaries,
    deleteBeneficiaries,
    getBeneficiaries,
    postAirtimeBeneficiaries,
    deleteAirtimeBeneficiaries,
    getAirtimeBeneficiaries,
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
    setTransactionPin,
    changeTransactionPin,
    freezeTransactions,
    unfreezeTransactions,
    getNewUserAccount,
    states,
    cardLogin,
    businessCategories,
    newUserCreateCorpAccount,
    setupBusProfile,
    userProfile,
    accountPrimary,
    getUserBankAccounts,
    uploadIdDocType,
    uploadMemartType,
    uploadCacCertType,
    uploadScmulType,
    shareRefFormtype,
    uploadRefferenceFormType,
    uploadUtilityDocumentype,
    ussdGen,
    ussdStatus,
    forgotPasswordtype,
    forgotPasswordReset,
    resetPassword,
    bankStatement,
    viewBvn,
    resetOtpType,
    existingBusnessSetup,
    sendCac,
    resetPin,
    pushDocuments,
    fetchRM,
    getRC,
    shareDocuments,
    getCAC,
    postEllevateProfilling,
    profilingQuestions,
    vninType,
    addressVerificationType,
    reffereeType,
    tinType,
    uploadreffereeType,
    cacDocummentType,
    generateQrType,
    qrInfoType,
    auth2Fa_Type,
    Paylink_Type,
    otpType,
    getMiniStatement_Type,
    getFullStatement_Type,
    qrMerchantInfo_Type,
    disputeType,
    disputCategoryType,
    disputSubCategoryType,
    lodgeComplaint_Type,
    verifyTransactionPinType,
    getAllComplaintType,
    deleteAccountType,
    setPrimaryAccountType,
    requestPhysicalQrType,
    addomniLiteType,
    addecoOnlineType,
    addAccountNumberType,
    validateCardType,
    validateAccountNumberType,
    addCardType,
    changeNumber,
    getProfileImg
} from '../types/actionTypes';
// import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';

var loginToken = '';
var Token;
var options = 1 / 24;

loginToken = getCookie('cookieToken', options);
if (loginToken === null) {
    Token = getCookie('cookieToken', options);
} else {
    Token = getCookie('cookieToken', options);
}

// export const getServerSideProps = async (context) => {
//     // Fetching de notre route
//     // API fetching
//     const res = getCookie('cookieToken', options);

//     const awaitToken = res;

//     return {
//         // Approvisionnement des props de notre page
//         // Sending articles to page
//         props: { token: awaitToken }
//     };
// };
const axiosInstance = axios.create({
    baseURL: 'https://mysmeapp.ecobank.com:8443',
    headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
        Authorization: `Bearer ${Token}`
    }
});

//St primary account Action Statr

//St primary account Action Statr
//St primary account Action End

//St primary account Action Statr

//St primary account Action End

//add omnilite account  Start

//add omnilite account End

//add coonline account  Start

//add ecoonline account End

//St primary account Action End

//St primary account Action Statr

//St primary account Action End
