import MainContainer from "@/components/MainContainer";

const ErrorPage = () => {
    return (
        <MainContainer>
            <div className="error">
                <h1>404</h1>
                <p>Дружище, ты ошибся страничкой,</p>
                <p>Скорее возвращайся обратно!</p>
            </div>
            <style jsx>{`
            .error{
                margin: 0 auto;
                text-align: center;
                color: var(--white);
            }
            h1{font-size: 8rem;}
            p{font-size: 1.5rem;}
            `}</style>
        </MainContainer>
    );
};

export default ErrorPage;