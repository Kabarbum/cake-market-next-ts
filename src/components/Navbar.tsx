import cls from "@/styles/Navbar.module.scss"
import Link from "next/link";
import Image from 'next/image'
import vk from "@/assets/img/vk.png"
import inst from "@/assets/img/instagram.png"
import {useRouter} from "next/router";
import MyMenu from "@/components/UI/MyMenu/MyMenu";
import {useState} from "react";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const links = [
    {id:0, route:'/',title:'Каталог'},
    {id:1, route:'/Fillings',title:'Начинки'},
    {id:2, route:'/Contacts',title:'Контакты'},
]

const Navbar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const isAuth = useTypedSelector(state=>state.admin.isAuth)
    const router = useRouter()

    return (
        <header className={cls.header}>
            <nav className={cls.nav}>
                <span className={cls.logo}>
                    <Link href="/">
                        Для&nbsp;десерта не&nbsp;нужен&nbsp;повод
                    </Link>
                </span>
                <ul className={cls.bigMenu}>

                    {links.map(el =>
                        <li key={el.id} className={cls.navItem}>
                            <Link href={el.route} className={el.route === router.route ? cls.active : ""}>{el.title}</Link>
                        </li>
                    )}

                    {isAuth &&
                        <li className={cls.navItem}>
                            <Link href={"/Admin"}>Д</Link>
                        </li>
                    }

                    <li className={cls.socials}>
                        <a href="https://vk.com/e.a.cherem">
                            <Image src={vk} alt="vk"/>
                        </a>

                        <a href="https://www.instagram.com/e.a.cherem/">
                            <Image src={inst} alt="instagram"/>
                        </a>
                    </li>
                </ul>

                <div className={isMenuVisible ? `${cls.burgerMenu} ${cls.active}` : `${cls.burgerMenu}`}
                     onClick={() => setIsMenuVisible(prev => !prev)}
                >
                    <span className={`${cls.line} ${cls.line1}`}/>
                    <span className={`${cls.line} ${cls.line2}`}/>
                    <span className={`${cls.line} ${cls.line3}`}/>
                </div>
                <MyMenu isMenuVisible={isMenuVisible} setMenuVisible={setIsMenuVisible}/>
            </nav>
            <div style={{height:1, backgroundColor:"#aaa", marginBottom:30}}/>
        </header>
    );
};

export default Navbar;