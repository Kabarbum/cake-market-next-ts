import {bindActionCreators} from "redux";
import {useDispatch} from "react-redux";

import {fillingActions} from "@/store/slices/filling/filling.slice";
import {productActions} from "@/store/slices/product/products.slice";

const allActions = {
    ...fillingActions,
    ...productActions,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}