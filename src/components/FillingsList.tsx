import React, {useEffect} from 'react';
import FillingItem from "./FillingItem";
import Loader from "./UI/Loader/Loader";
// import {useDispatch, useSelector} from "react-redux";
// import {initFillings} from "../asnycAction/fillings";

const FillingsList = () => {
    // const dispatch = useDispatch()
    const fillings = [
        {id:1,title:'имя1',price:1,composition:["ingr1","ingr1"], imgUrl:'https://firebasestorage.googleapis.com/v0/b/cake-market-859d1.appspot.com/o/fillings%2Ffilling_img_7zdFzPqL9PVMxa22fmTT?alt=media&token=2edad12c-2639-4f72-87b3-b002caa6d665'},
        {id:2,title:'имя2',price:2,composition:["ingr1","ingr1"], imgUrl:'https://firebasestorage.googleapis.com/v0/b/cake-market-859d1.appspot.com/o/fillings%2Ffilling_img_7zdFzPqL9PVMxa22fmTT?alt=media&token=2edad12c-2639-4f72-87b3-b002caa6d665'},
        {id:3,title:'имя3',price:3,composition:["ingr1","ingr1"], imgUrl:'https://firebasestorage.googleapis.com/v0/b/cake-market-859d1.appspot.com/o/fillings%2Ffilling_img_7zdFzPqL9PVMxa22fmTT?alt=media&token=2edad12c-2639-4f72-87b3-b002caa6d665'},
        {id:4,title:'имя4',price:4,composition:["ingr1","ingr1"], imgUrl:'https://firebasestorage.googleapis.com/v0/b/cake-market-859d1.appspot.com/o/fillings%2Ffilling_img_7zdFzPqL9PVMxa22fmTT?alt=media&token=2edad12c-2639-4f72-87b3-b002caa6d665'}
    ]//useSelector(state => state.fillings.fillings)
    const isFillingsLoading = false//useSelector(state => state.fillings.isFillingsLoading)


    useEffect(() => {
        // dispatch(initFillings())
    }, [])

    return (
        <>
            {isFillingsLoading ?
                <Loader/>
                :
                <>
                    {fillings.map(el => <FillingItem
                        key={el.id}
                        fillingItem={el}
                    />)}
                </>

            }
        </>
    );
};

export default FillingsList;