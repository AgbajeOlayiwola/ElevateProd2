import { combineReducers } from 'redux';
import { paymentReducer } from './payment.reducer';
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
import authReducer from './auth.reducer';
import registerReducer from './register.reducer';

const rootReducer = combineReducers({
    paymentReducer: paymentReducer,
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
    interBankEnquiryReducer: interBankEnquiryReducer,
    balanceEnquiryReducer: balanceEnquiryReducer,
    billerTypeReducer: billerTypeReducer,
    auth: authReducer,
    registered: registerReducer
});

export default rootReducer;
