import cls from "./MyMenu.module.scss"
import Link from "next/link";
import {FC} from "react";
import {useTypedSelector} from "@/hooks/useTypedSelector";

type MyMenuProps = {
    isMenuVisible: boolean
    setMenuVisible: (payload:boolean) => void
}

const MyMenu:FC<MyMenuProps> = ({isMenuVisible, setMenuVisible}) => {
    const isAuth = useTypedSelector(state=>state.admin.isAuth)
    const menuHandler = () => {
        setMenuVisible(false)
    }
    return (
        <>
            {isMenuVisible &&
                <div className={cls.menu} onClick={menuHandler}>
                    <ul>
                        <li><Link href="/">Каталог</Link></li>
                        <li><Link href={"/Fillings"}>Начинки</Link></li>
                        <li><Link href={"/Contacts"}>Контакты</Link></li>
                        {isAuth && <li><Link href={"/Admin"}>Админка</Link></li>}

                        <li><a href="https://vk.com/e.a.cherem">Вконтакте</a></li>
                        <li><a href="https://tlgg.ru/RinaYa">Телеграм</a></li>
                    </ul>
                </div>
            }
        </>
    );
};

export default MyMenu;