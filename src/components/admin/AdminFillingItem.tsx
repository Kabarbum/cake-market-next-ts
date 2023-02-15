import {FC} from 'react';
import Image from "next/image";
import {deleteFilling} from "@/firebase/requests/fillings";
import {IFilling} from "@/types";
import cls from "@/styles/Fillings.module.scss"

interface FillingItemProps {
    filling: IFilling
    setItem: (product: IFilling) => void
}

const FillingItem: FC<FillingItemProps> = ({filling, setItem}) => {
    const handleChange = () => {
        setItem(filling)
    }
    const deleteHandle = () => {
        const res = window.confirm("Удалить?")
        if (res) {
            deleteFilling(filling.id, filling.imgUrl.toString())
        }
    }
    return (
        <div className={cls.fillings__item}>
            <div className={cls.fillings__itemImg}>
                <Image src={filling.imgUrl.toString()} alt="img" width={380} height={500}/>
                <div className={cls.wave}/>
            </div>
            <div className={cls.fillings__itemContent}>
                <div className={cls.fillings__itemContent__top}>
                    <h3>{filling.title}</h3>
                    <span>{filling.price} руб/кг</span>
                </div>
                <ul className={cls.fillings__itemProperty}>
                    {filling.composition.map((el, idx) =>
                        <li key={idx}>{el}</li>
                    )}
                </ul>
                <div className="fillings__item-btns">
                    <div onClick={handleChange}>изменить</div>
                    <div onClick={deleteHandle}>удалить</div>
                </div>
            </div>
            <style jsx>{`
            .fillings__item-btns{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .fillings__item-btns div{
                margin-top: 10px;
                padding: 6px 10px;
                border: 1px solid var(--orange);
                border-radius: 10px;
                background-color: #fff;
                text-align: center;
                text-transform: uppercase;
                font-family: "Arial", serif;
                cursor: pointer;
            }
            .fillings__item-btns div:hover{
                 background-color: var(--orange);
             }
            `}</style>
        </div>
    );
};

export default FillingItem;