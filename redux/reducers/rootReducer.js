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
    registered: registerReducer
});

export default rootReducer;
