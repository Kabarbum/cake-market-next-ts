import React, {FC} from 'react';
import {deleteProduct} from "@/firebase/requests/products";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {IProduct} from "@/types";
import cls from "@/styles/Home.module.scss";

interface ProductItemProps {
    product: IProduct
    setItem: (product:IProduct) => void
}

const ProductItem: FC<ProductItemProps> = ({product, setItem}) => {
    const categories = useTypedSelector(state=>state.products.categories)
    const changeHandle = () => {
        setItem(product)
    }
    const deleteHandle = () => {
        const res = window.confirm("Удалить?")
        if(res) {
            deleteProduct(product.id, product.imgUrl)
        }
    }
    return (
        <div className={cls.productsItem}>
            <div className={cls.productsItem__img}>
                <img src={product.imgUrl} alt="img"/>
            </div>
            <div className={cls.productsItem__content}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className={cls.productsItem__bottom}>
                    <span>Вес: {product.weight} кг.</span>
                    <span>Цена: {product.price} руб.</span>
                </div>
                <p>{categories[product.categoryId]?.title}</p>
                <div className="products-item__btn" onClick={changeHandle}>изменить</div>
                <div className="products-item__btn" onClick={deleteHandle}>удалить</div>
            </div>
            <div/>
            <style jsx>{`
            .products-item__btn{
                margin-top: 10px;
                padding: 6px 10px;
                text-align: center;
                background-color: #fff;
                border: 1px solid var(--orange);
                border-radius: 10px;
                text-transform: uppercase;
                font-family: "Arial", serif;
                cursor: pointer;
            }
            .products-item__btn:hover{
                background-color: var(--orange);
            }
            `}</style>
        </div>
    );
};

export default ProductItem;