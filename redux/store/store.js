import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { authApi } from '../api/authApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import profileReducer from '../slices/profile';
import {
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    profile: profileReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
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

export default store;
