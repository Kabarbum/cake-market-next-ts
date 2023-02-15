import {FC, useState} from 'react';
import Image from "next/image";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cls from "@/styles/Home.module.scss";
import {IProduct} from "@/types";

interface ProductItemProps {
    product: IProduct
}

const ProductItem: FC<ProductItemProps> = ({product}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openHandler = () => {
        setIsOpen(true)
    }
    const closeHandler = (target: any) => {
        if (target.localName !== 'img')
            setIsOpen(false)
    }
    return (
        <div className={cls.productsItem}>
            <div className={cls.productsItem__img} onClick={openHandler}>
                <LazyLoadImage
                    alt="cake"
                    effect="blur"
                    src={product.imgUrl}
                />
            </div>
            <div className={isOpen ? `${cls.img__blurContainer} ${cls.active}` : cls.img__blurContainer}>
                <div onClick={e => closeHandler(e.target)}>
                    <Image
                        className={cls.img__blur}
                        src={product.imgUrl}
                        alt="img"
                        fill
                        sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>
            <div
                className={isOpen ? `${cls.imgBg__blur} ${cls.active}` : cls.imgBg__blur}
                onClick={e => closeHandler(e.target)}
            />
            <div className={cls.productsItem__content}>
                <h3>{product.title}</h3>
                <div className={cls.productsItem__bottom}>
                    Вес: {product.weight.toString()} кг.
                </div>
            </div>
            <div/>
        </div>
    );
};

export default ProductItem;