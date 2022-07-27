import { combineReducers } from 'redux';
import { paymentReducer } from './payment.reducer';
import countryReducer from './country.reducer';
import languageReducer from './language.reducer';
import banksReducer from './banks.reducer';
import billerCategoryReducer from './billerCategory.reducer';
import billerTypeReducer from './billerType.reducer';
import authReducer from './auth.reducer';
import registerReducer from './register.reducer';

const rootReducer = combineReducers({
    paymentReducer: paymentReducer,
    countryReducer: countryReducer,
    languages: languageReducer,
    banksReducer: banksReducer,
    billerCategoryReducer: billerCategoryReducer,
    billerTypeReducer: billerTypeReducer,
    auth: authReducer,
    registered: registerReducer
});

export default rootReducer;
