import { combineReducers } from 'redux';
import countryReducer from './country.reducer';
import internationalCountryReducer from './internationalCountry.reducer';
import languageReducer from './language.reducer';
import banksReducer from './banks.reducer';
import billerCategoryReducer from './billerCategory.reducer';
import billerTypeReducer from './billerType.reducer';
import billerPlanReducer from './billerPlan.reducer';
import airtimeReducer from './airtime.reducer';
import airtimeNetworkReducer from './airtimeNetwork.reducer';
import billsReducer from './bills.reducer';
import internalBankReducer from './internalBank.reducer';
import interBankEnquiryReducer from './interBankEnquiry.reducer';
import intraBankEnquiryReducer from './intraBankEnquiry.reducer';
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
import deleteBeneficiariesReducer from './deleteBeneficiary.reducer';
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
import bankAccountsReducer from './bankAccounts.reducer';
import userProfileReducer from './userProfile.reducer';
import utilityUploadReducer from './utilityupload.reducer';
import documentIdentificationReducer from './uploadIdDco.reducer';
import uploadScmulReducer from './uploadScmul.reducer';
import uploadMemartReducer from './memart.reducer';
import shareRefReducer from './shareRefferenceForm.reducer';
import uploadRefReducer from './uploadrefform.reducer';
import uploadBoardResReducer from './boardresolution.reducer';
import cacUploadReducer from './cac.reducer';
import accountPrimaryReducer from './accountPrimary.reducer';
import setTransactionPinReducer from './setTransactionPin.reducer';
import fogrotPasswordReducer from './forgotpassword.reducer';
import forgotPasswordResetReducer from './forgotpasswordReset.reducer';
import resetOtpReducer from './resetotp.reducer';
import ussdGenReducer from './ussdGen.reducer';
import ussdStatusReducer from './ussdStatus.reducer';
import viewBvnReducer from './viewBvn.reducer';
import resetPasswordReducer from './resetPassword.reducer';
import bankStatementReducer from './bankStatement.reducer';
import freezeTransactionsReducer from './freezeTransactions.reducer';
import changeTransactionPinReducer from './changeTransactionPin.reducer';
import unfreezeTransactionsReducer from './unfreezeTransactions.reducer';
import ExistingProfileSetupReducer from './exixtingUserProfile.reducer';
import transactionFeesReducer from './transactionFees.reducer';
import logoutReducer from './logout.reducer';
import pushDocumentsReducer from './pushDocuments.reducer';
import shareDocumentsReducer from './shareDocuments.reducer';
import existReducer from './exist.reducer';

const appReducer = combineReducers({
    countryReducer: countryReducer,
    internationalCountryReducer: internationalCountryReducer,
    languages: languageReducer,
    banksReducer: banksReducer,
    billerCategoryReducer: billerCategoryReducer,
    billerPlanReducer: billerPlanReducer,
    billerTypeReducer: billerTypeReducer,
    airtimeReducer: airtimeReducer,
    airtimeNetworkReducer: airtimeNetworkReducer,
    billsReducer: billsReducer,
    internalBankReducer: internalBankReducer,
    interBankReducer: interBankReducer,
    transactionHistoryReducer: transactionHistoryReducer,
    transactionFeesReducer: transactionFeesReducer,
    transactionElevateReducer: transactionElevateReducer,
    interBankEnquiryReducer: interBankEnquiryReducer,
    intraBankEnquiryReducer: intraBankEnquiryReducer,
    balanceEnquiryReducer: balanceEnquiryReducer,
    billerTypeReducer: billerTypeReducer,
    bulkTransferReducer: bulkTransferReducer,
    internationalTransferReducer: internationalTransferReducer,
    verifyBankReducer: verifyBankReducer,
    verifyCurrencyReducer: verifyCurrencyReducer,
    getBeneficiariesReducer: getBeneficiariesReducer,
    deleteBeneficiariesReducer: deleteBeneficiariesReducer,
    postBeneficiariesReducer: postBeneficiariesReducer,
    auth: authReducer,
    logoutReducer: logoutReducer,
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
    completeBusProfileReducer: completeBusinessprofileReducer,
    newUserAccountDetails: getNewUserAccountReducer,
    statesReducer: statesReducer,
    cardLoginReducer: cardLoginReducer,
    newUserAccountDets: newUsercreateAccountReducer,
    newuserCorpAccount: newUsercreateCorpAccountReducer,
    bankAccountsReducer: bankAccountsReducer,
    userProfileReducer: userProfileReducer,
    uploadUtilityReducer: utilityUploadReducer,
    documentIdentificationReducer: documentIdentificationReducer,
    uploadScmulReducer: uploadScmulReducer,
    uploadMemartReducer: uploadMemartReducer,
    shareRefReducer: shareRefReducer,
    uploadRefReducer: uploadRefReducer,
    uploadBoardResReducer: uploadBoardResReducer,
    cacUploadReducer: cacUploadReducer,
    ussdGenReducer: ussdGenReducer,
    ussdStatusReducer: ussdStatusReducer,
    accountPrimaryReducer: accountPrimaryReducer,
    setTransactionPinReducer: setTransactionPinReducer,
    userProfileReducer: userProfileReducer,
    fogrotPasswordReducer: fogrotPasswordReducer,
    forgotPasswordResetReducer,
    viewBvnReducer: viewBvnReducer,
    resetPasswordReducer: resetPasswordReducer,
    bankStatementReducer: bankStatementReducer,
    resetOtpReducer: resetOtpReducer,
    ExistingProfileSetupReducer: ExistingProfileSetupReducer,
    completeBusinessprofileReducer,
    unfreezeTransactionsReducer,
    freezeTransactionsReducer,
    changeTransactionPinReducer,
    pushDocumentsReducer,
    shareDocumentsReducer,
    completeBusinessprofileReducer,
    existReducer: existReducer
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_START') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
export default rootReducer;
