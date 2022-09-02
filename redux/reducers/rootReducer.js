import { combineReducers } from 'redux';
import countryReducer from './country.reducer';
import languageReducer from './language.reducer';
import banksReducer from './banks.reducer';
import billerCategoryReducer from './billerCategory.reducer';
import billerTypeReducer from './billerType.reducer';
import billerPlanReducer from './billerPlan.reducer';
import airtimeReducer from './airtime.reducer';
import billsReducer from './bills.reducer';
import internalBankReducer from './internalBank.reducer';
import interBankEnquiryReducer from './interBankEnquiry.reducer';
import balanceEnquiryReducer from './balanceEnquiry.reducer';
import interBankReducer from './interBank.reducer';
import transactionHistoryReducer from './transactionHistory.reducer';
import transactionElevateReducer from './transactionElevate.reducer';
import bulkTransferReducer from './bulkTransfer.reducer';
import internationalTransferReducer from './internationalTransfer.reducer';
import verifyBankReducer from './verifyBank.reducer';
import verifyCurrencyReducer from './verifyCurrency.reducer';
import postBeneficiariesReducer from './postBeneficiary.reducer';
import getBeneficiariesReducer from './getBeneficiaries.reducer';
import authReducer from './auth.reducer';
import registerReducer from './register.reducer';
import profileReducer from './completeprofile.reducer';
import otpReducer from './otp.reducer';
import profileSetupReducer from './profilesetup.reducer';
import completeBusinessprofileReducer from './completeBusinessProfile.reducer';
import omniliteReducer from './omnilite.reducer';
import accountNumberReducer from './accountNumber.reducer';
import existingUserProfileReducer from './exixtingUserProfile.reducer';
import ecobankOnlineReducer from './ecobankOnline.reducer';
import createAccountReducer from './createAccount.reducer';
import accountStatusReducer from './accountStatus.reducer';
import businessCategoriesReducer from './businessCategories.reducer';
import getNewUserAccountReducer from './getNewUserAccount.reducer';
import newUsercreateAccountReducer from './newUserCraeteAccount.reducer';
import cardLoginReducer from './cardLogin.reducer';
import statesReducer from './states.reducer';
import newUsercreateCorpAccountReducer from './newusercorporate.reducer';

const rootReducer = combineReducers({
    countryReducer: countryReducer,
    languages: languageReducer,
    banksReducer: banksReducer,
    billerCategoryReducer: billerCategoryReducer,
    billerPlanReducer: billerPlanReducer,
    billerTypeReducer: billerTypeReducer,
    airtimeReducer: airtimeReducer,
    billsReducer: billsReducer,
    internalBankReducer: internalBankReducer,
    interBankReducer: interBankReducer,
    transactionHistoryReducer: transactionHistoryReducer,
    transactionElevateReducer: transactionElevateReducer,
    interBankEnquiryReducer: interBankEnquiryReducer,
    balanceEnquiryReducer: balanceEnquiryReducer,
    billerTypeReducer: billerTypeReducer,
    bulkTransferReducer: bulkTransferReducer,
    internationalTransferReducer: internationalTransferReducer,
    verifyBankReducer: verifyBankReducer,
    verifyCurrencyReducer: verifyCurrencyReducer,
    getBeneficiariesReducer: getBeneficiariesReducer,
    postBeneficiariesReducer: postBeneficiariesReducer,
    auth: authReducer,
    registered: registerReducer,
    profile: profileReducer,
    otp: otpReducer,
    profileSetup: profileSetupReducer,
    omniliteReducer: omniliteReducer,
    accountNumberReducer: accountNumberReducer,
    existingUserProfileReducer: existingUserProfileReducer,
    ecobankOnlineReducer: ecobankOnlineReducer,
    accountStatusReducer: accountStatusReducer,
    createAccountReducer: createAccountReducer,
    businessCategoriesReducer: businessCategoriesReducer,
    completeBusProfile: completeBusinessprofileReducer,
    newUserAccountDetails: getNewUserAccountReducer,
    statesReducer: statesReducer,
    cardLoginReducer: cardLoginReducer,
    newUserAccountDets: newUsercreateAccountReducer,
    newuserCorpAccount: newUsercreateCorpAccountReducer
});

export default rootReducer;
