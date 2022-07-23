import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { paymentReducer } from './payment.reducer';
import countryReducer from './countries/country.reducer';
import languageReducer from './languages/language.reducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
    paymentReducer: paymentReducer,
    countryReducer: countryReducer,
    languages: languageReducer
});

export default rootReducer;
