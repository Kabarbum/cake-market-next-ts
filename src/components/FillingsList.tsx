import FillingItem from "./FillingItem";
import Loader from "./UI/Loader/Loader";
import {useTypedSelector} from "@/hooks/useTypedSelector";


const FillingsList = () => {
    const fillings = useTypedSelector(state => state.fillings.fillings)
    const isFillingsLoading = useTypedSelector(state => state.fillings.isFillingsLoading)

    return (
        <>
            {isFillingsLoading ?
                <Loader/>
                :
                <>
                    {fillings.map(el =>
                        <FillingItem
                            key={el.id}
                            fillingItem={el}
                        />
                    )}
                </>

            }
        </>
    );
};

export default FillingsList;
