import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../index";
import {ICategory} from "@/types";

export const addCategory = async (category: ICategory) => {
    const categoriesRef = collection(firestore, "categories");
    await setDoc(doc(categoriesRef, `category_${category.id}`), {
        id: category.id,
        title: category.title
    })
}

export const fetchCategories = async () => {
    const q = query(collection(firestore, "categories"))

    const querySnapshot = await getDocs(q);

    const arr: ICategory[] = []
    querySnapshot.forEach(doc => arr.push(<ICategory>doc.data()));

    return arr
}

export const updateCategory = async (category: ICategory) => {
    const categoryRef = doc(firestore, "categories", `category_${category.id}`);
    await updateDoc(categoryRef, {
        title: category.title
    });
}

export const deleteCategory = async (id: Number) => {
    await deleteDoc(doc(firestore, "categories", `category_${id}`));
}