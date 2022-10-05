// Payments
const getBanks = '/bank-list';
const getCountries = '/affiliates-countries';
const getLanguages = '/languages';
const getBillerCategories = '/payment/billers/categories';
const getBillerType = '/payment/billers';
const getBillerPlan = 'billers/details/';
const airtime = '/payments/airtime-topup';
const airtimeNetwork = '/payment/airtime-topup/networks';
const bills = '/payments/bill-payment';
const internalBank = '/transfer/internal-transfer';
const interBank = '/payment/single-transfer';
const interBankEnquiry = '/bank-account/intra-bank/info';
const balanceEnquiry = '/bank-account/balance';
const accountPrimary = '/bank-account/primary';
const transactionHistory = '/account/transaction';
const setTransactionPin = '/account-upgrade/transaction-pin/set';
const transactionElevate = '/account/transaction/ellevate';
const bulkTransfer = '/payment/bulk-transfer';
const verifyBank = '/transfer/international/validate-bank';
const verifyCurrency = '/transfer/international/currency';
const internationalTransfer = '/transfer/international';
const beneficiaries = '/account/beneficiaries';
const register = '/authentication/register';
const login = '/authentication/login';
const newProfileSetup = '/auth/profile-setup';
const userProfile = '/users/profile';
const profileSetupBus = '/authentication/profile-setup/registered-business';
const profileSetup = '/authentication/profile-setup/unregistered-business ';
const verifyOtp = '/verification/verify/otp';
const verifyStatusBus = '/document-verification/registered-business';
const verifyDob = '/verification/verify/dob';
const authProfile = '/document-verification/user-doc';
const account = '/auth/account';
const completesBusinessProfile = '/business/setup';
const newCreateAccount = '/bank-account/create/individual';
const createAccount = '/account/corp/create-for-existing-user';
const corpNewUser = '/bank-account/corp/create';
const accountStatus = '/bank-account/individual/status';
const corpAccountStatus = '/bank-account/corp/status';
const verifyStatus = '/document-verification/unregistered-business';
const omnilite = '/authentication/register/omnilite';
const ecobankOnline = '/authentication/register/ecobank-online';
const accountNumber = '/authentication/register/account-number';
const existingUserProfile =
    '/authentication/profile-setup/unregistered-business/eco-auth';
const businessCategories = '/business-categories';
const states = '/lga';
const cardLogin = '/auth/register/card';
const banksAccounts = '/bank-account';
const uploadUtilityDocument = '/account-upgrade/utility-document/upload';
const uploadIdentificationDoc = '/account-upgrade/utility-document/upload';
const uploadMemart = '/account-upgrade/memart/upload';
const uploadCacCert = '/account-upgrade/cac-cert/upload';
const uploadScmul = '/account-upgrade/scuml/upload';
const shareRefForm = '/account-upgrade/reference-form/share';
const uploadRefForm = '/account-upgrade/reference-form/share';
const uploadBoardRes = '/account-upgrade/board-resolution/upload';
export default {
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
    balanceEnquiry,
    getLanguages,
    register,
    login,
    newProfileSetup,
    transactionHistory,
    setTransactionPin,
    transactionElevate,
    verifyBank,
    verifyCurrency,
    internationalTransfer,
    userProfile,
    corpNewUser,
    bulkTransfer,
    beneficiaries,
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
    uploadUtilityDocument
};
