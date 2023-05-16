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
import postAirtimeBeneficiariesReducer from './postAirtimeBeneficiary.reducer';
import getAirtimeBeneficiariesReducer from './getAirtimeBeneficiaries.reducer';
import deleteAirtimeBeneficiariesReducer from './deleteAirtimeBeneficiary.reducer';
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
import fetchRMReducer from './fetchRM.reducer';
import getRCReducer from './getRC.reducer';
import postEllevateReducer from './ellevateProfiling.reducer';
import profilingQuestionsReducer from './profilingQuestion.reducer';
import vninReducer from './vnin.reducer';
import addressVerificationReducer from './addressverification.reducer';
import refferenceEmailReducer from './refferenceEmail.reducer';
import tinReducer from './tin.reducer';
import uploadRefereeFileReducer from './uploadrefereefile.reducer';
import cacDocUploadReducer from './cacdocument.reducer';
import qrInfoReducer from './qrInfo.reducer';
import paymentQrReducer from './paymentQr.reducer';
import auth2FaReducer from './auth2Fa.reducer';
import generateQrInfo from './generateQr.reducer';
import payLinkGenReducer from './paylinkGen.reducer';
import getMiniStatementReducer from './getMinistatement.reducer';
import getFullStatementReducer from './getFullstatement.reducer';
import getQrMerchantInfoReducermport from './getQrMerchantInfo.reducer';
import getDisputeTypeReducer from './getDisputeType.reducer';
import getDisputeCategoryReducer from './getDisputeCategory.reducer';
import getDisputeSubCategoryReducer from './getDisputSubCategory.reducer';
import lodgeDisputeReducer from './lodgeDispute.reducer';
import verifyTransactionPinReducer from './verifyTransactionPin.reducer';
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
    getAirtimeBeneficiariesReducer: getAirtimeBeneficiariesReducer,
    deleteAirtimeBeneficiariesReducer: deleteAirtimeBeneficiariesReducer,
    postAirtimeBeneficiariesReducer: postAirtimeBeneficiariesReducer,
    auth: authReducer,
    logoutReducer: logoutReducer,
    registered: registerReducer,
    profile: profileReducer,
    otpReducer: otpReducer,
    profileSetup: profileSetupReducer,
    omniliteReducer: omniliteReducer,
    getRCReducer: getRCReducer,
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
    forgotPasswordResetReducer: forgotPasswordResetReducer,
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
    fetchRMReducer,
    completeBusinessprofileReducer,
    existReducer: existReducer,
    postEllevateReducer: postEllevateReducer,
    profilingQuestionsReducer: profilingQuestionsReducer,
    vninReducer: vninReducer,
    addressVerificationReducer: addressVerificationReducer,
    refferenceEmailReducer: refferenceEmailReducer,
    tinReducer: tinReducer,
    uploadRefereeFileReducer: uploadRefereeFileReducer,
    cacDocUploadReducer: cacDocUploadReducer,
    qrInfoReducer: qrInfoReducer,
    paymentQrReducer: paymentQrReducer,
    auth2FaReducer: auth2FaReducer,
    generateQrInfo: generateQrInfo,
    payLinkGenReducer: payLinkGenReducer,
    getMiniStatementReducer: getMiniStatementReducer,
    getFullStatementReducer: getFullStatementReducer,
    getQrMerchantInfoReducermport: getQrMerchantInfoReducermport,
    getDisputeTypeReducer: getDisputeTypeReducer,
    getDisputeCategoryReducer: getDisputeCategoryReducer,
    getDisputeSubCategoryReducer: getDisputeSubCategoryReducer,
    lodgeDisputeReducer: lodgeDisputeReducer,
    verifyTransactionPinReducer: verifyTransactionPinReducer
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_START') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
export default rootReducer;
