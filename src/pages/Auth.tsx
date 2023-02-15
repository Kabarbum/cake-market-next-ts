import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/navigation";
import MainContainer from "@/components/MainContainer";

const Auth = () => {
    const {setAuth} = useActions()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const authHandler = async () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, login, password)
            .then(() => {
                setAuth(true)
                router.push("/Admin");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert("Уходи вон отсюда, паршивка вонючая^_^")
            });
    }

    return (
        <MainContainer>
            <form className="auth-form">
                <h3>Вход в админ-панель</h3>
                <input
                    type="text"
                    placeholder="Логин..."
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="admin-from__btn" onClick={authHandler}>Войти</div>
            </form>
            <style jsx>{`
            .auth-form{
                width: 400px;
                padding: 30px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                border-radius: 15px;
                background-color: rgba(95, 147, 255, 0.5);
            }
            .auth-form h3{
                text-align: center;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: #fff;
            }
            .auth-form input {
                min-width: 100%;
                margin-top: 10px;
                padding: 8px 12px;
                border-radius: 10px;
                outline: none;
                border: none;
                font-size: 1.3rem;
            }
            .admin-from__btn{
                align-self: flex-end;
                margin-top: 10px;
                padding: 8px 12px;
                border: 2px solid var(--white);
                border-radius: 10px;
                background-color: #2e76ab;
                font-family: Arial, serif;
                font-size: 1.3rem;
                color: #fff;
                cursor: pointer;
                transition: .2s;
            }
            .admin-from__btn:hover{
                color: var(--orange);
                border-color: var(--orange);
            }
            `}</style>
        </MainContainer>
    );
};

export default Auth;