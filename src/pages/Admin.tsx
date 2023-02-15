import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/router";
import AdminProducts from "@/components/admin/AdminProducts";
import MainContainer from "@/components/MainContainer";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminFillings from "@/components/admin/AdminFillings";
import {fetchProducts} from "@/firebase/requests/products";
import {fetchCategories} from "@/firebase/requests/categories";
import {ICategory, IProduct} from "@/types";
import {useActions} from "@/hooks/useActions";

interface AdminProps {
    products: IProduct[]
    categories: ICategory[]
}
const Admin:FC<AdminProps> = ({products, categories}) => {
    const isAuth = useTypedSelector(state => state.admin.isAuth)
    const {setProducts, setCategories, setLastVisible, setProductsExists} = useActions()
    const router = useRouter()
    const [page, setPage] = useState(0)
    useEffect(() => {
        if(router.isReady && !isAuth)
            router.push("/Auth")
    }, [router.isReady])
    useEffect(() => {
        setCategories(categories)
        setProducts(products)
        setLastVisible(products.at(-1)?.id)
        setProductsExists(true)
    })
    if (!isAuth) {
        return <div>hui</div>
    }
    return (
        <MainContainer>
            <div className="container admin-container">
                <div className="admin-header">
                    <div onClick={() => setPage(0)} className={page === 0 ? "active" : ''}>Каталог</div>
                    <div onClick={() => setPage(1)} className={page === 1 ? "active" : ''}>Начинки</div>
                    <div onClick={() => setPage(2)} className={page === 2 ? "active" : ''}>Категории</div>
                </div>
                <div className="admin-content">
                    {page === 0 && <AdminProducts/>}
                    {page === 1 && <AdminFillings/>}
                    {page === 2 && <AdminCategories/>}
                </div>
            </div>
            <style jsx>{`
            .admin-header{
                width: 100%;
                display: flex;
                justify-content: center;
                color: #fff;
            }
            @media (max-width: 500px) {
                .admin-header{
                    flex-direction: column;
                }
            }
            .admin-header div{
                padding: 5px 15px 0;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                font-size: 1.5rem;
                cursor: pointer;
            }
            .admin-header div.active{
                border: 2px solid rgba(208,241,255,.5);
                border-bottom-color: rgba(208,241,255,0);
            }
            .admin-header div:not(:last-child){
                margin-right: 10px;
            }
            `}</style>
        </MainContainer>
    );
};

export default Admin;

export const getServerSideProps = async () => {
    const products = await fetchProducts(0)
    const categories = await fetchCategories()
    return {
        props: {products, categories},
    }
}