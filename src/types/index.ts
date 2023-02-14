import {OrderByDirection} from "@firebase/firestore-types";

export type IFilling = {
    id: number
    title:string
    price:number
    imgUrl: string
    composition: string[]
}
export type IProduct = {
    id: number
    title: string
    categoryId: number
    weight: number
    imgUrl: string
    description? : string
    price? : number
}
export type ICategory = {
    id: number
    title: string
}
export interface IFetchProducts {
    selectedCategoryId: number,
    limit: number,
}
export interface IFetchModeProducts extends IFetchProducts{
    selectedSort: [string, OrderByDirection],
    lastVisible: string,
    isProductsExists: boolean
}