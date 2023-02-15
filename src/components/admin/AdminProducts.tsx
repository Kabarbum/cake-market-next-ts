import {useEffect, useRef} from 'react';
import Loader from "@/components/UI/Loader/Loader";
import AdminProductsForm from "./AdminProductsForm";
import AdminProductItem from "./AdminProductItem";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {IProduct} from "@/types";
import cls from "@/styles/Home.module.scss"
import {useActions} from "@/hooks/useActions";
import {fetchProducts} from "@/firebase/requests/products";
import {fetchCategories} from "@/firebase/requests/categories";
import {getMoreProducts} from "@/store/slices/product/asyncActions";
import {useTypedDispatch} from "@/hooks/useTypedDispatch";

const AdminProducts = () => {
    const {setProduct, setProductChanging, setProductsExists, setPrevProductUrl,setProducts,setCategories} = useActions()
    const dispatch = useTypedDispatch()
    const products = useTypedSelector(state => state.products.products)
    const isProductLoading = useTypedSelector(state => state.products.isProductLoading)
    const isProductPreLoading = useTypedSelector(state => state.products.isProductPreLoading)
    const isProductsExists = useTypedSelector(state => state.products.isProductsExists)
        //for fetch more
    const selectedSort = useTypedSelector(state => state.products.selectedSort)
    const limit = useTypedSelector(state => state.products.limit)
    const lastVisible = useTypedSelector(state => state.products.lastVisible)

    const observer = useRef<IntersectionObserver | null>(null)
    const lastElem = useRef<any>(null)

    useEffect(() => {
        if (isProductPreLoading) return
        if (observer.current) observer.current.disconnect()
        const callback = async function (entries: any) {
            if (entries[0].isIntersecting && !isProductLoading) {
                dispatch(getMoreProducts({selectedCategoryId: 0, selectedSort, limit, lastVisible, isProductsExists}))
            }
        }
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(lastElem.current)

    }, [isProductPreLoading, isProductLoading])

    const setItem = (product: IProduct) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setProductChanging(true)
        setProduct(product)
        setPrevProductUrl(product.imgUrl)
    }

    useEffect(() => {
        setProductsExists(true)
        async function fetchData(){
            const products = await fetchProducts(0)
            setProducts(products)
            const categories = await fetchCategories()
            setCategories(categories)
        }
        fetchData()
    }, [])

    return (
        <div>
            <AdminProductsForm/>
            <div>
                {isProductPreLoading ? <Loader/>
                    : <div className={cls.products}>
                        {products.map(product =>
                            <AdminProductItem
                                product={product}
                                setItem={setItem}
                                key={product.id}
                            />
                        )}
                        <div ref={lastElem} style={{width: "100vw", height: 2}}/>
                    </div>
                }
                {isProductsExists && isProductLoading && <Loader/>}
            </div>
        </div>
    );
};

export default AdminProducts;