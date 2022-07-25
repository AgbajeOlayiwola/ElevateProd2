import { combineReducers } from 'redux';
import { paymentReducer } from './payment.reducer';
import countryReducer from './countries/country.reducer';
import languageReducer from './languages/language.reducer';
import banksReducer from './banks/banks.reducer';
import billerCategoryReducer from './billerCategory/billerCategory.reducer';

const rootReducer = combineReducers({
    paymentReducer: paymentReducer,
    countryReducer: countryReducer,
    languages: languageReducer,
    banksReducer: banksReducer,
    billerCategoryReducer: billerCategoryReducer
});

export default rootReducer;
