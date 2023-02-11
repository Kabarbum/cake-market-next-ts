import cls from "@/styles/Footer.module.css"
// import {useNavigate} from "react-router-dom";

const Footer = () => {
    // const navigate = useNavigate()
    const clickHandler = () => {
        // navigate('/auth')
    }
    return (
        <footer className={cls.footer}>
            ©2023-{(new Date()).getFullYear()} Все права защищены
            <span onClick={clickHandler}>,</span>
            'торты Питер на заказ'
        </footer>
    );
};

export default Footer;