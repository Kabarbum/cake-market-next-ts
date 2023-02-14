import MainContainer from "@/components/MainContainer";
import FillingsList from "@/components/FillingsList";
import cls from "@/styles/Fillings.module.scss"
import {IFilling} from "@/types";
import {fetchFillings} from "@/firebase/requests/fillings";
import {FC, useEffect} from "react";
import {useActions} from "@/hooks/useActions";

interface FillingsProps {
    fillings: IFilling[]
}

const Fillings: FC<FillingsProps> = ({fillings}) => {
    const {setFillingsLoading, setFillings} = useActions()
    useEffect(() => {
        setFillingsLoading(true)
        setFillings(fillings)
        setFillingsLoading(false)
    }, [])

    return (
        <MainContainer>
            <div className="container">
                <div className={cls.fillings}>
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

export const getStaticProps = async () => {
    const fillings = await fetchFillings()
    return {
        props: {fillings},
    }
}