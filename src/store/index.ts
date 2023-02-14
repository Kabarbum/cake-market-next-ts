import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import {firebaseReducer, getFirebase} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import logger from "redux-logger"
import {fillingReducer} from "./slices/filling/filling.slice";
import {productReducer} from "@/store/slices/product/products.slice";

const rootReducer = combineReducers({
    products: productReducer,
    fillings: fillingReducer,
    // admin: adminReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat()//, thunk.withExtraArgument(getFirebase)
})

export type TypeDispatch = typeof store.dispatch
export type TypeRootState = ReturnType<typeof store.getState>