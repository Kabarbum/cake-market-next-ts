import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {fillingReducer} from "./slices/filling/filling.slice";
import {productReducer} from "@/store/slices/product/products.slice";
import {adminReducer} from "@/store/slices/admin/admin.slice";

const rootReducer = combineReducers({
    products: productReducer,
    fillings: fillingReducer,
    admin: adminReducer,
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