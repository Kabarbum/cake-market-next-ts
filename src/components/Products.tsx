import {useEffect, useRef} from 'react';
import ProductItem from "./ProductItem";
import Loader from "./UI/Loader/Loader"
import cls from "@/styles/Home.module.scss"
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {getMoreProducts} from "@/store/slices/product/asyncActions";
import {useTypedDispatch} from "@/hooks/useTypedDispatch";

const Products = () => {
    const dispatch = useTypedDispatch()
    const products = useTypedSelector(state => state.products.products)
    const isProductPreLoading = useTypedSelector(state => state.products.isProductPreLoading)
    const isProductLoading = useTypedSelector(state => state.products.isProductLoading)
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

    }, [isProductPreLoading, isProductLoading, dispatch])
    return (
        <div>
            {isProductPreLoading ? <Loader/>
                : <div className={cls.products}>
                    {products.map(product =>
                        <ProductItem
                            product={product}
                            key={product.id}
                        />
                    )}
                    <div ref={lastElem} style={{width: "100vw", height: 2}}/>
                </div>
            }
            {isProductsExists && isProductLoading && <Loader/>}
        </div>
    );
};

export default Products;