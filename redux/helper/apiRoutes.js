// Payments
const getBanks = '/banks';
const getCountries = '/countries';
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
const register = '/auth/register';
const login = '/auth/login';
const newProfileSetup = '/auth/profile-setup';
const profile = '/auth/profile';
const profileSetupBus = '/auth/profile-setup';
const verifyOtp = '/verification/verify/otp';
const verifyDob = '/verification/verify/dob';
const authProfile = '/auth/profile';
const account = '/auth/account';
const completesBusinessProfile = '/business';
const newCreateAccount = '/account';
const createAccount = '/account/create';
const accountStatus = '/account/status';
const verifyStatus = '/verification/document/status';
const omnilite = '/auth/register/omnilite';
const ecobankOnline = '/auth/register/ecobank-online';
const accountNumber = '/auth/register/account-number';
const existingUserProfile = '/auth/existing-user/profile-setup/personal';
export default {
    getBanks,
    getCountries,
    getBillerCategories,
    getBillerType,
    getBillerPlan,
    getLanguages,
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
    newCreateAccount
};
