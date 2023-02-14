import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoreProducts, fetchProducts} from "@/firebase/requests/products";
import {setLastVisible, setProductLoading, setProductPreLoading, setProductsExists} from "@/store/slices/product/products.slice";
import {IFetchModeProducts, IFetchProducts} from "@/types";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async ({selectedCategoryId, limit}:IFetchProducts, {dispatch}) => {
        dispatch(setProductPreLoading(true))

        const products = await fetchProducts(selectedCategoryId, limit)

        dispatch(setProductsExists(true))
        dispatch(setLastVisible(products[products.length - 1].id))
        dispatch(setProductPreLoading(false))

        return products
    }
)
export const getMoreProducts = createAsyncThunk(
    'product/getMoreProducts',
    async ({selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists}:IFetchModeProducts, {dispatch}) => {
        if (!isProductsExists) return
        dispatch(setProductLoading(true))
        const products = await fetchMoreProducts(selectedCategoryId, selectedSort, limit, lastVisible)
        if (products.length === 0) {
            dispatch(setProductLoading(false))
            dispatch(setProductsExists(false))
            return null
        }
        dispatch(setLastVisible(products[products.length - 1].id))
        dispatch(setProductLoading(false))
        return products
    }
)