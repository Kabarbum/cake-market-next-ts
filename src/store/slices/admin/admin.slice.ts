import {createSlice} from "@reduxjs/toolkit";
import {ICategory, IFilling, IProduct} from "@/types";
import {v4 as uuidv4} from "uuid";

interface IInitialState {
    isAuth: boolean
    product: IProduct
    prevProductUrl: string
    isProductChanging: boolean
    filling: IFilling
    prevFillingUrl: string,
    isFillingChanging: boolean,
    category: ICategory
    isCategoryChanging: boolean
}

const initialState: IInitialState = {
    isAuth: false,
    product: {
        id: uuidv4(),
        title: "",
        description: "",
        price: 0,
        weight: 0,
        categoryId: 1,
        imgUrl: <Blob><unknown>"https://placehold.co/600"
    },
    prevProductUrl: "",
    isProductChanging: false,
    filling: {
        id: uuidv4(),
        title: "",
        composition: [""],
        price: 0,
        imgUrl: <Blob><unknown>"https://placehold.co/600"
    },
    prevFillingUrl: "",
    isFillingChanging: false,
    category: {
        id: 99,
        title: ""
    },
    isCategoryChanging: false,
}

type ProductPropertyType = 'id' | 'title' | 'description' | 'price' | 'weight' | 'categoryId' | 'imgUrl'
type FillingPropertyType = 'id' | 'title' | 'composition' | 'price' | 'imgUrl'
type CategoryPropertyType = 'id' | 'title'

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAuth: (state, dispatch) => {
            state.isAuth = dispatch.payload
        },
        setProduct: (state, dispatch) => {
            state.product = dispatch.payload
        },
        setProductDefault: (state) => {
            state.product = {
                id: uuidv4(), title: "", description: "", price: 0,
                weight: 0, categoryId: 1, imgUrl: <Blob><unknown>"https://placehold.co/600"
            }
        },
        setProductProperty: (state, dispatch) => {
            const {property, value}: { property: ProductPropertyType, value: never } = dispatch.payload
            state.product[property] = value
        },
        setPrevProductUrl: (state, dispatch) => {
            state.prevProductUrl = dispatch.payload
        },
        setProductChanging: (state, dispatch) => {
            state.isProductChanging = dispatch.payload
        },
        setFilling: (state, dispatch) => {
            state.filling = dispatch.payload
        },
        setFillingDefault: (state) => {
            state.filling = {
                id: uuidv4(), title: "", composition: [""], price: 0,
                imgUrl: <Blob><unknown>"https://placehold.co/600"
            }
        },
        setFillingProperty: (state, dispatch) => {
            const {property, value}: { property: FillingPropertyType, value: never } = dispatch.payload
            state.filling[property] = value
        },
        setFillingCompositionItem: (state, dispatch) => {
            const {id, value} = dispatch.payload
            state.filling.composition[id] = value
        },
        addFillingCompositionItem: (state) => {
            state.filling.composition.push("")
        },
        removeFillingCompositionItem: (state, dispatch) => {
            state.filling.composition.splice(dispatch.payload, 1)
        },
        setPrevFillingUrl: (state, dispatch) => {
            state.prevFillingUrl = dispatch.payload
        },
        setFillingChanging: (state, dispatch) => {
            state.isFillingChanging = dispatch.payload
        },
        setCategoryDefault: (state, dispatch) => {
            state.category = {id: dispatch.payload, title: ""}
        },
        setCategoryProperty: (state, dispatch) => {
            const {property, value}: { property: CategoryPropertyType, value: never } = dispatch.payload
            state.category[property] = value
        },
        setCategoryChanging: (state, dispatch) => {
            state.isCategoryChanging = dispatch.payload
        }
    }
})

export const adminReducer = adminSlice.reducer
export const adminActions = adminSlice.actions