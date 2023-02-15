import {useEffect, useRef} from 'react';
import Loader from "@/components/UI/Loader/Loader";
import AdminProductsForm from "./AdminProductsForm";
import AdminProductItem from "./AdminProductItem";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {IProduct} from "@/types";
import cls from "@/styles/Home.module.scss"
import {useActions} from "@/hooks/useActions";
import {getMoreProducts} from "@/store/slices/product/asyncActions";
import {useTypedDispatch} from "@/hooks/useTypedDispatch";

const AdminProducts = () => {
    const {
        setProduct,
        setProductChanging,
        setPrevProductUrl,
    } = useActions()
    const dispatch = useTypedDispatch()
    const products = useTypedSelector(state => state.products.products)
    const isProductLoading = useTypedSelector(state => state.products.isProductLoading)
    const isProductPreLoading = useTypedSelector(state => state.products.isProductPreLoading)
    const isProductsExists = useTypedSelector(state => state.products.isProductsExists)

    const observer = useRef<IntersectionObserver | null>(null)
    const lastElem = useRef<any>(null)

    useEffect(() => {
        if (isProductPreLoading) return
        if (observer.current) observer.current.disconnect()
        const callback = async function (entries: any) {
            if (entries[0].isIntersecting && !isProductLoading) {
                dispatch(getMoreProducts())
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

    return (
        <div>
            <AdminProductsForm/>
            <div>
                {isProductPreLoading ? <Loader/>
                    : <div className={cls.products}>
                        {products.map(product =>
                            <AdminProductItem
                                key={product.id}
                                product={product}
                                setItem={setItem}
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