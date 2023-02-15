import AdminFillingItem from "./AdminFillingItem";
import Loader from "@/components/UI/Loader/Loader";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {IFilling} from "@/types";
import {useActions} from "@/hooks/useActions";
import cls from "@/styles/Fillings.module.scss"

const FillingsList = () => {
    const {setFillingChanging, setFilling, setPrevFillingUrl} = useActions()
    const fillings = useTypedSelector(state => state.fillings.fillings)
    const isFillingsLoading = useTypedSelector(state => state.fillings.isFillingsLoading)

    const setItem = (filling: IFilling) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setFillingChanging(true)
        setFilling(filling)
        setPrevFillingUrl(filling.imgUrl)
    }

    return (
        <div className={cls.fillings__sectionContent}>
            {isFillingsLoading ?
                <Loader/>
                :
                <>
                    {fillings.map(el =>
                        <AdminFillingItem
                            key={el.id}
                            filling={el}
                            setItem={setItem}
                        />
                    )}
                </>
            }
        </div>
    );
};

export default FillingsList;