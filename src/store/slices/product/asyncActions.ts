import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoreProducts, fetchProducts} from "@/firebase/requests/products";
import {setLastVisible, setProductLoading, setProductPreLoading, setProductsExists} from "@/store/slices/product/products.slice";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, {getState, dispatch}) => {
        const {products} = getState() as any
        const {selectedCategoryId, limit} = products
        dispatch(setProductPreLoading(true))

        const newProducts = await fetchProducts(selectedCategoryId, limit)
        dispatch(setProductsExists(true))
        dispatch(setLastVisible(newProducts[newProducts.length - 1].id))
        dispatch(setProductPreLoading(false))

        return newProducts
    }
)
export const getMoreProducts = createAsyncThunk(
    'product/getMoreProducts',
    async (_, {dispatch, getState}) => {
        const {products} = getState() as any
        const {selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists} = products

        if (!isProductsExists) return
        dispatch(setProductLoading(true))
        const fetchedProducts = await fetchMoreProducts(selectedCategoryId, selectedSort, limit, lastVisible)
        if (fetchedProducts.length === 0) {
            dispatch(setProductLoading(false))
            dispatch(setProductsExists(false))
            return null
        }
        // @ts-ignore
        dispatch(setLastVisible(fetchedProducts.at(-1).id))
        dispatch(setProductLoading(false))
        return fetchedProducts
    }
)