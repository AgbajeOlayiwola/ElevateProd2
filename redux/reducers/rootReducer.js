import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { paymentReducer } from './payment.reducer';
import countryReducer from './country.reducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
    paymentReducer: paymentReducer,
    countryReducer: countryReducer
});

export default rootReducer;
