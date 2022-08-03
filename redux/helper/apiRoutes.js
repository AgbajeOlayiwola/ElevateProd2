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
const balanceEnquiry = '/payments/balance-inquiry';
const transactionHistory = '/payments/transaction-history';
const register = '/auth/register';
const login = '/auth/login';
const newProfileSetup = '/auth/profile-setup';
const profile = '/auth/profile';
const profileSetupBus = '/auth/profile-setup';
const verifyOtp = '/verification/verify/otp';
const authProfile = '/auth/profile';
const account = '/auth/account';
const completesBusinessProfile = '/business';
const createAccount = '/account';
const accountStatus = '/account/status';
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
    profile,
    profileSetupBus,
    verifyOtp,
    authProfile,
    account,
    completesBusinessProfile,
    createAccount,
    accountStatus
};
