import {createSlice} from "@reduxjs/toolkit";
import {IFilling} from "@/types";

interface IInitialState {
    fillings: IFilling[]
    isFillingsLoading: boolean
}

const initialState: IInitialState = {
    fillings: [],
    isFillingsLoading: false
}

export const fillingSlice = createSlice({
    name: 'filling',
    initialState,
    reducers: {
        setFillings: (state, dispatch) => {
            state.fillings = dispatch.payload
        },
        setFillingsLoading: (state, dispatch) => {
            state.isFillingsLoading = dispatch.payload
        }
    }
})

export const fillingReducer = fillingSlice.reducer
export const fillingActions = fillingSlice.actions