import { combineReducers } from 'redux';
import { paymentReducer } from './payment.reducer';
import countryReducer from './countries/country.reducer';
import languageReducer from './languages/language.reducer';

const rootReducer = combineReducers({
    paymentReducer: paymentReducer,
    countryReducer: countryReducer,
    languages: languageReducer
});

export default rootReducer;
