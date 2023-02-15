export type IFilling = {
    id: string
    title: string
    price: number
    imgUrl: Blob
    composition: string[]
}
export type IProduct = {
    id: string
    title: string
    categoryId: number
    weight: number
    imgUrl: Blob
    description?: string
    price?: number
}
export type ICategory = {
    id: number
    title: string
}