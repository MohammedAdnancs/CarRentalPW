import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authslice/authslice'
import message from './slices/Messagesslice/Messagesslice'
import list from './slices/listslice/listslice'
import admin from './slices/adminslice/adminslice'
import storage from "redux-persist/lib/storage"
import { REHYDRATE, persist } from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit"
import { version } from 'react'
import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
    key: "root",
    storage,
}

const reducer = combineReducers({
    auth,
    message,
    list,
    admin
})

const PersistReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: PersistReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default store;