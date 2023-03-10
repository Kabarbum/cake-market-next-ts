import { IFilling } from '@/types';
import {FC} from 'react';
import Image from "next/image";
import cls from "@/styles/Fillings.module.scss"

interface FillingItemProps {
    fillingItem: IFilling
}

const FillingItem:FC<FillingItemProps> = ({fillingItem}) => {
    return (
        <div className={cls.fillings__item}>
            <div className={cls.fillings__itemImg}>
                <Image
                    alt="FillingImg"
                    src={fillingItem.imgUrl.toString()}
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={cls.wave}/>
            </div>
            <div className={cls.fillings__itemContent}>
                <div className={cls.fillings__itemContent__top}>
                    <h3>{fillingItem.title}</h3>
                    <span>{fillingItem.price.toString()}&nbsp;руб <span style={{whiteSpace:'nowrap'}}>/</span>кг</span>
                </div>
                <ul className={cls.fillings__itemProperty}>
                    {fillingItem.composition.map((el, idx) =>
                        <li key={idx}>{el}</li>
                    )}
                </ul>
                <div/>
            </div>
        </div>
    );
};

export default FillingItem;