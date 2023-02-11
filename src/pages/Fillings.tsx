import MainContainer from "@/components/MainContainer";
import FillingsList from "@/components/FillingsList";
import cls from "@/styles/Fillings.module.scss"

const Fillings = () => {
    return (
        <MainContainer>
            <div className="container">
                <div className={cls.fillings}>
                    <h1>Начинки</h1>

                    <div className={cls.titleLine}/>

                    <div className={cls.fillings__section}>
                        <div className={cls.fillings__sectionContent}>

                            <FillingsList/>

                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Fillings;