import {useDispatch} from "react-redux";
import {TypeDispatch} from "@/store";

export const useTypedDispatch = () => useDispatch<TypeDispatch>()