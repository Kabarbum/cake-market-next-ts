import cls from "./MyMenu.module.scss"
import Link from "next/link";
import {FC} from "react";
// import {useSelector} from "react-redux";

type MyMenuProps = {
    isMenuVisible: boolean
    setMenuVisible: (payload:boolean) => void
}

const MyMenu:FC<MyMenuProps> = ({isMenuVisible, setMenuVisible}) => {
    // const isAuth = false//useSelector(state=>state.admin.isAuth)
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
                        {/*{isAuth && <li><Link href="/Admin">Админка</Link></li>}*/}

                        <li><a href="https://vk.com/karamel_zlat">Вконтакте</a></li>
                        <li><a href="https://www.instagram.com/e.a.cherem/">Инстаграм</a></li>
                    </ul>
                </div>
            }
        </>
    );
};

export default MyMenu;