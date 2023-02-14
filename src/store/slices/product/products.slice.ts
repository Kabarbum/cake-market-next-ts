import {createSlice} from "@reduxjs/toolkit";
import {ICategory, IProduct} from "@/types";
import {getMoreProducts, getProducts} from "@/store/slices/product/asyncActions";
import {OrderByDirection} from "@firebase/firestore-types";

interface IInitialState {
    products: IProduct[]
    categories: ICategory[]
    selectedCategoryId: number
    selectedSort: [string, OrderByDirection]
    limit: number
    lastVisible: string
    isProductPreLoading: boolean
    isProductLoading: boolean
    isProductsExists: boolean
}

const initialState: IInitialState = {
    products: [],
    categories: [],
    selectedCategoryId: 0,
    selectedSort: ["id", "asc"],
    limit: 6,
    lastVisible: "0",
    isProductPreLoading: false,
    isProductLoading: false,
    isProductsExists: true
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, dispatch) => {
            state.products = dispatch.payload
        },
        setProductLoading: (state, dispatch) => {
            state.isProductLoading = dispatch.payload
        },
        setProductPreLoading: (state, dispatch) => {
            state.isProductPreLoading = dispatch.payload
        },
        setProductsExists: (state, dispatch) => {
            state.isProductsExists = dispatch.payload
        },
        setLastVisible: (state, dispatch) => {
            state.lastVisible = dispatch.payload
        },
        setCategories: (state, dispatch) => {
            const categories = [...dispatch.payload]
            categories.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id)
            state.categories = categories
        },
        setCategoryId: (state, dispatch) => {
            state.selectedCategoryId = dispatch.payload
        },
        setDefault: (state) => {
            state.lastVisible = '0'
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getMoreProducts.fulfilled, (state, action) => {
            if(action.payload)
                state.products.push(...action.payload)
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            if(action.payload.length !== 0)
                state.products = action.payload
        })
    }
})

export const productReducer = productSlice.reducer
export const productActions = productSlice.actions
export const {setProductPreLoading,setProductLoading, setLastVisible, setProductsExists} = productSlice.actions