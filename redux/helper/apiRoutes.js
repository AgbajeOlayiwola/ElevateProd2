// Payments
const getBanks = '/bank-list';
const getCountries = '/affiliates-countries';
const getLanguages = '/languages';
const getBillerCategories = '/payment/billers/categories';
const getBillerType = '/payment/billers';
const getBillerPlan = '/payment/billers/details';
const airtime = '/payment/airtime-topup';
const airtimeNetwork = '/payment/airtime-topup/networks';
const bills = '/payment/biller-payment';
const internalBank = '/transfer/internal-transfer';
const interBank = '/payment/single-transfer';
const intraBankEnquiry = '/bank-account/intra-bank/info';
const interBankEnquiry = '/bank-account/inter-bank/info';
const balanceEnquiry = '/bank-account/balance';
const accountPrimary = '/bank-account/primary';
const transactionHistory = '/transactions/filter';
// const allTransactions = 'accountPrimarys?.accountNumber'
const setTransactionPin = '/account-upgrade/transaction-pin/set';
const changeTransactionPin = '/users/transaction-pin';
const transactionElevate = '/transactions/filter';
const bulkTransfer = '/payment/bulk-transfer';
const verifyBank = '/payment/international-transfer/validate-bank';
const verifyCurrency = '/payment/international-tranfer/allowed-currency';
const internationalTransfer = '/transfer/international';
const beneficiaries = '/beneficiaries';
const deleteBeneficiaries = '/beneficiaries/delete/';
const airtimeBeneficiaries = '/phone-number-beneficiaries';
const deleteAirtimeBeneficiaries = '/phone-number-beneficiaries/delete/';
const ussdGen = '/payment/ussd/generate';
const ussdStatus = '/payment/ussd/status';
const register = '/authentication/register';
const login = '/authentication/login';
const newProfileSetup = '/auth/profile-setup';
const userProfile = '/users/profile';
const profileSetupBus = '/authentication/profile-setup/registered-business';
const profileSetup = '/authentication/profile-setup/unregistered-business ';
const verifyOtp = '/authentication/otp/verify';
const verifyStatusBus = '/document-verification/registered-business';
const verifyDob = '/verification/verify/dob';
const authProfile = '/document-verification/user-doc';
const account = '/auth/account';
const completesBusinessProfile = '/business/setup';
const newCreateAccount = '/bank-account/create/individual';
const createAccount = '/account/corp/create-for-existing-user';
const corpNewUser = '/bank-account/create/corperate';
const accountStatus = '/bank-account/status';
const corpAccountStatus = '/bank-account/corp/status';
const verifyStatus = '/document-verification/unregistered-business';
const omnilite = '/authentication/register/omnilite';
const ecobankOnline = '/authentication/register/ecobank-online';
const accountNumber = '/authentication/register/account-number';
const existingUserProfile = '/authentication/profile-setup/eco-auth';
const businessCategories = '/business-categories';
const states = '/lga';
const cardLogin = '/authentication/register/card';
const banksAccounts = '/bank-account';
const transactionFees = '/transactions/transaction-fees';
const uploadUtilityDocument = '/account-upgrade/utility-document/upload';
const uploadIdentificationDoc =
    '/account-upgrade/identification-document/upload-json';
const uploadMemart = '/account-upgrade/memart/upload';
const uploadCacCert = '/account-upgrade/cac-cert/upload';
const uploadScmul = '/account-upgrade/scuml/upload';
const shareRefForm = '/account-upgrade/reference-form/share';
const uploadRefForm = '/account-upgrade/reference-form/share';
const uploadBoardRes = '/account-upgrade/board-resolution/upload';
const forgotPassword = '/authentication/forget-password';
const forgotPasswordReset = '/authentication/reset-password';
const resetOtp = '/authentication/otp/re-send';
const resetPin = '/users/transaction-pin/reset';
const viewBvn = '/users/bvn/view';
const resetPassword = '/users/password';
const bankStatement = '/transactions';
const freezeTransactions = '/users/freeze-transactions';
const unfreezeTransactions = '/users/unfreeze-transactions';
const businessNameCac = '/business/name';
const verifyCac = '/document-verification/cac';
const internationalCountries = '/international-countries';
const pushDocuments = '/account-upgrade/push-document-for-review';
const shareDocuments = '/share-point-document';
const fetchRM = '/bank-account/account-manager';
const postEllevateProfiling = '/ellevate-profiling';
const profilingQuestions = '/ellevate-profiling/questions';
const vnin = '/account-upgrade/vNin-verification';
const verifyVNinAdd = '/document-verification/vNin/status';
const addressVerification = '/address-verification/status';
const reffernceFormShare = '/account-upgrade/reference-form/share';
const uploadTin = '/account-upgrade/tin';
const uploadrefferee = '/account-upgrade/reference-form/upload';
const cacDocumentUpload = '/account-upgrade/cac-document/upload';
const paymentQr = '/payment/qr';
const generateQr = '/payment/qr/generate';
const qrInfo = '/payment/qr/generate';
const auth2Fa = '/authentication/login/2FA';
const paymentLink = '/payment/payment-link/create';
const complaintType = '/dispute-management/get-complaint-types';
const complaintCategory = '/dispute-management/get-complaint-categories';
const subcomplaint = '/dispute-management/get-complaint-sub-categories';
const getMiniStatemnt = '/bank-account/statement/mini';
const getFullStatement = '/bank-account/statement/full';
const trackComplaint = '/dispute-management/track-complaint';
const lodgeComplaint = '/dispute-management/lodge-complaint';
const complaintTypes = '/dispute-management/get-complaint-types';
const complaintCategories = '/dispute-management/get-complaint-categories';
const subComplaintCategories =
    '/dispute-management/get-complaint-sub-categories';
const qrMerchantInfo = '/payment/qr/merchant-info';
const verifyTransactionPin = '/users/transaction-pin/verify';
const getAllComplaint = '/dispute-management/records';
const deleteAccount = '/users/delete-account';
const setPrimaryAccount = '/bank-account/primary';
export default {
    getAllComplaint,
    trackComplaint,
    lodgeComplaint,
    complaintCategories,
    subComplaintCategories,
    complaintTypes,
    getBanks,
    getCountries,
    getBillerCategories,
    getBillerType,
    verifyStatusBus,
    getBillerPlan,
    getLanguages,
    profileSetup,
    airtime,
    airtimeNetwork,
    bills,
    internalBank,
    interBank,
    interBankEnquiry,
    intraBankEnquiry,
    balanceEnquiry,
    getLanguages,
    register,
    login,
    newProfileSetup,
    transactionHistory,
    setTransactionPin,
    changeTransactionPin,
    transactionElevate,
    verifyBank,
    verifyCurrency,
    internationalTransfer,
    userProfile,
    corpNewUser,
    bulkTransfer,
    beneficiaries,
    deleteBeneficiaries,
    airtimeBeneficiaries,
    deleteAirtimeBeneficiaries,
    profileSetupBus,
    verifyOtp,
    verifyDob,
    authProfile,
    account,
    completesBusinessProfile,
    createAccount,
    accountStatus,
    omnilite,
    accountNumber,
    existingUserProfile,
    ecobankOnline,
    verifyStatus,
    businessCategories,
    states,
    cardLogin,
    newCreateAccount,
    corpAccountStatus,
    accountPrimary,
    banksAccounts,
    uploadBoardRes,
    uploadCacCert,
    uploadIdentificationDoc,
    uploadMemart,
    uploadRefForm,
    uploadScmul,
    shareRefForm,
    uploadUtilityDocument,
    ussdGen,
    ussdStatus,
    forgotPassword,
    forgotPasswordReset,
    viewBvn,
    resetPassword,
    bankStatement,
    freezeTransactions,
    unfreezeTransactions,
    resetOtp,
    transactionFees,
    businessNameCac,
    internationalCountries,
    pushDocuments,
    shareDocuments,
    fetchRM,
    verifyCac,
    postEllevateProfiling,
    profilingQuestions,
    vnin,
    verifyVNinAdd,
    addressVerification,
    reffernceFormShare,
    uploadTin,
    uploadrefferee,
    cacDocumentUpload,
    paymentQr,
    generateQr,
    qrInfo,
    auth2Fa,
    paymentLink,
    complaintType,
    complaintCategory,
    subcomplaint,
    getMiniStatemnt,
    getFullStatement,
    qrMerchantInfo,
    lodgeComplaint,
    resetPin,
    verifyTransactionPin,
    deleteAccount,
    setPrimaryAccount
};
