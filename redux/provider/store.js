import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { authApi } from '../api/authApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import profileReducer from '../slices/profile';
import languageReducer from '../slices/language';
import {
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { docsApi } from '../api/docsApi';
import { usersApi } from '../api/usersApi';
import { cacApi } from '../api/cacApi';
const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cacApi.reducerPath]: cacApi.reducer,
    profile: profileReducer,
    language: languageReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['language', 'profile']
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
        }).concat(authApi.middleware)
});

export const useAppDispatch = () => useDispatch();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
