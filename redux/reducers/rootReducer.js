import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { paymentReducer } from './payment.reducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
    paymentReducer: paymentReducer
});

export default rootReducer;
