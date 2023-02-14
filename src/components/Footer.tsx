// import {useNavigate} from "react-router-dom";

const Footer = () => {
    // const navigate = useNavigate()
    const clickHandler = () => {
        // navigate('/auth')
    }
    return (
        <>
            <footer>
                ©2023-{(new Date()).getFullYear()} Все права защищены
                <span onClick={clickHandler}>,</span>
                'торты Питер на заказ'
            </footer>
            <style jsx>
                {`
                    footer{
                        height: 50px;
                        color: var(--white);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(200,200,200,0.3);
                    }
                `}
            </style>
        </>

    );
};

export default Footer;