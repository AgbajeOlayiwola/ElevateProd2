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
import { usersApi } from '../api/usersApi';
import accountNumberReducer from '../slices/accountNumberSlice';
import allAccountInfoReducr from '../slices/allAccountInfoSlice';
import existingUserDetailsReducer from '../slices/existingUserData';
import faceMatchDetailsReducr from '../slices/facematchSlice';
import languageReducer from '../slices/language';
import moreAccountNumberDetailsReducer from '../slices/moreAccountNumberDetails';
import pinnedReducer from '../slices/pinned';
import profileReducer from '../slices/profile';
import resetPasswordReducer from '../slices/resetpasswordslice';
import transferReducer from '../slices/transferSlice';
const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cacApi.reducerPath]: cacApi.reducer,
    profile: profileReducer,
    language: languageReducer,
    existingUserDetails: existingUserDetailsReducer,
    moreAccountNumberDetails: moreAccountNumberDetailsReducer,
    pinned: pinnedReducer,
    accountNumber: accountNumberReducer,
    faceMatchDetails: faceMatchDetailsReducr,
    allAccountInfo: allAccountInfoReducr,
    transfer: transferReducer,
    resetPasswordslice: resetPasswordReducer
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
        'resetPasswordslice'
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
        }).concat(authApi.middleware, docsApi.middleware, cacApi.middleware)
});

export const useAppDispatch = () => useDispatch();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
