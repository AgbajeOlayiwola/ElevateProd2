import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../api/authApi';
import { cacApi } from '../api/cacApi';
import { docsApi } from '../api/docsApi';
import { logisticsApi } from '../api/logisticsApi';
import { unifiedApi } from '../api/unifiedApi';
import { usersApi } from '../api/usersApi';
import accountNumberReducer from '../slices/accountNumberSlice';
import addInventoryReducer from '../slices/addInventorySlice';
import affiliateReducer from '../slices/affiliateSlice';
import allAccountInfoReducr from '../slices/allAccountInfoSlice';
import allStoreInventoriesReducer from '../slices/allInventoriesSlice';
import allStoresReducer from '../slices/allStoresSlice';
import analyticsDataReducer from '../slices/analyticsData';
import cartReducer from '../slices/cart';
import cartItemReducer from '../slices/cartItems';
import createSToreReducer from '../slices/creatStoreSlice';
import dynamiQrDataReeducer from '../slices/dynamicQrSlice';
import existingUserDetailsReducer from '../slices/existingUserData';
import faceMatchDetailsReducr from '../slices/facematchSlice';
import languageReducer from '../slices/language';
import loanRepaymentReducer from '../slices/loanRepayment';
import loanRequestReducer from '../slices/loanRequst';
import loanDataReducer from '../slices/loansData';
import moreAccountNumberDetailsReducer from '../slices/moreAccountNumberDetails';
import orderDetailsReducer from '../slices/orderDetails';
import pinnedReducer from '../slices/pinned';
import profileReducer from '../slices/profile';
import resetPasswordReducer from '../slices/resetpasswordslice';
import storeFrontAnalyticsRducer from '../slices/storFrontAnalyticsSlice';
import storeSliceReducer from '../slices/storeSlice';
import tokenReducer from '../slices/tokenSlice';
import transferReducer from '../slices/transferSlice';
import ussdDataReducer from '../slices/ussddataSlice';
import viewInventoryReducer from '../slices/viewInventorySlice';
import viewProductDataReducer from '../slices/viewProductSlice';
import createInvoiceSlice from '../slices/createInvoiceSlice';
const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cacApi.reducerPath]: cacApi.reducer,
    [logisticsApi.reducerPath]: logisticsApi.reducer,
    [unifiedApi.reducerPath]: unifiedApi.reducer,
    profile: profileReducer,
    language: languageReducer,
    existingUserDetails: existingUserDetailsReducer,
    moreAccountNumberDetails: moreAccountNumberDetailsReducer,
    pinned: pinnedReducer,
    accountNumber: accountNumberReducer,
    faceMatchDetails: faceMatchDetailsReducr,
    allAccountInfo: allAccountInfoReducr,
    transfer: transferReducer,
    resetPasswordslice: resetPasswordReducer,
    token: tokenReducer,
    dynamicQrData: dynamiQrDataReeducer,
    analyticsData: analyticsDataReducer,
    ussdData: ussdDataReducer,
    createStoreSliceData: createSToreReducer,
    storeSlice: storeSliceReducer,
    cartSlice: cartReducer,
    viewProductSliceData: viewProductDataReducer,
    cartItem: cartItemReducer,
    addInventory: addInventoryReducer,
    viewInventory: viewInventoryReducer,
    allStores: allStoresReducer,
    affiliate: affiliateReducer,
    allInventories: allStoreInventoriesReducer,
    loanRequest: loanRequestReducer,
    loanRepayment: loanRepaymentReducer,
    loanData: loanDataReducer,
    orderDetails: orderDetailsReducer,
    createInvoiceSlice: createInvoiceSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'language',
        'profile',
        'existingUserDetails',
        'moreAccountNumberDetails',
        'pinned',
        'accountNumber',
        'faceMatchDetails',
        'allAccountInfo',
        'transfer',
        'resetPasswordslice',
        'token',
        'dynamicQrData',
        'analyticsData',
        'ussdData',
        'createStoreSliceData',
        'storeSlice',
        'cartSliceData',
        'viewProductSliceData',
        'cartItem',
        'addInventory',
        'viewInventory',
        'allStores',
        'affiliate',
        'allInventories',
        'loanRequest',
        'loanScoring',
        'loanRepayment',
        'loanData',
        'orderDetails',
        'createInvoiceSlice'
    ]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(
            authApi.middleware,
            docsApi.middleware,
            cacApi.middleware,
            logisticsApi.middleware,
            unifiedApi.middleware
        )
});

export const useAppDispatch = () => useDispatch();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
