// Payments
const getBanks = '/bank-list';
const getCountries = '/affiliates-countries';
const getLanguages = '/languages';
const getBillerCategories = '/billers/category';
const getBillerType = '/billers/affiliate/';
const getBillerPlan = 'billers/details/';
const airtime = '/payments/airtime-topup';
const bills = '/payments/bill-payment';
const internalBank = '/transfer/internal-transfer';
const interBank = '/transfer/inter-bank-transfer';
const interBankEnquiry = '/transfer/inter-bank-enquiry';
const balanceEnquiry = '/account/balance-inquiry';
const transactionHistory = '/account/transaction';
const transactionElevate = '/account/transaction/ellevate';
const bulkTransfer = '/transfer/bulk-transfer';
const verifyBank = '/transfer/international/validate-bank';
const verifyCurrency = '/transfer/international/currency';
const internationalTransfer = '/transfer/international';
const beneficiaries = '/account/beneficiaries';
const register = '/authentication/register';
const login = '/authentication/login';
const newProfileSetup = '/auth/profile-setup';
const profile = '/users/profile';
const profileSetupBus = '/authentication/profile-setup/registered-business';
const profileSetup = '/authentication/profile-setup/unregistered-business ';
const verifyOtp = '/verification/verify/otp';
const verifyStatusBus = '/document-verification/registered-business';
const verifyDob = '/verification/verify/dob';
const authProfile = '/document-verification/user-doc';
const account = '/auth/account';
const completesBusinessProfile = '/business/setup';
const newCreateAccount = '/bank-account/individual/create';
const createAccount = '/account/corp/create-for-existing-user';
const corpNewUser = '/account/corp/create-for-new-user';
const accountStatus = '/bank-account/individual/status';
const corpAccountStatus = '/account/corp-acct';
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
    transactionElevate,
    verifyBank,
    verifyCurrency,
    internationalTransfer,
    profile,
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
    banksAccounts
};
