import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {firestore, storage} from "../index";
import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {setFillingUrlAction} from "@/store/slices/admin/admin";
import {IFilling} from "@/types";
import {TypeDispatch} from "@/store";

export function addFilling(filling: IFilling) {
    const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)
    const uploadTask = uploadBytesResumable(fillingImgRef, <Blob><unknown>filling.imgUrl)
    uploadTask.on('state_changed',
        () => {},
        (error) => {
            console.log("Upload image error: ", error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                filling = {...filling, imgUrl: downloadURL}
                const fillingsRef = collection(firestore, "fillings");
                await setDoc(doc(fillingsRef, filling.id.toString()), {
                    id: filling.id,
                    title: filling.title,
                    composition: filling.composition,
                    price: Number(filling.price),
                    imgUrl: filling.imgUrl
                })
            });
        }
    );
}
export const fetchFillings = async () => {
    const q = query(collection(firestore, "fillings"))

    const querySnapshot = await getDocs(q);

    const arr: IFilling[] = []
    querySnapshot.forEach(doc => arr.push(<IFilling>doc.data()));
    return arr
}

export const updateFilling = async (filling: IFilling, prevFillingUrl: string, dispatch: TypeDispatch) => {
    const fillingRef = doc(firestore, "fillings", filling.id.toString());
    if (prevFillingUrl !== filling.imgUrl) {
        const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)

        const uploadTask = uploadBytesResumable(fillingImgRef, <Blob><unknown>filling.imgUrl)

        uploadTask.on('state_changed',
            () => {},
            (error) => {
                console.log("Upload image error: ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                    dispatch(setFillingUrlAction(downloadURL))
                    await updateDoc(fillingRef, {imgUrl: downloadURL});
                });
            }
        );
    }
    await updateDoc(fillingRef, {
        id: filling.id,
        title: filling.title,
        composition: filling.composition,
        price: filling.price,
    });
}
export const deleteFilling = async (id: Number, Url: string) => {
    const url = (new URL(Url)).pathname.split("%2F")
    const newUrl = url[url.length - 1]

    await deleteDoc(doc(firestore, "fillings", id.toString()));

    const fillingImgRef = ref(storage, `fillings/${newUrl}`);
    deleteObject(fillingImgRef).then(() => {
        console.log("File deleted successfully")
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!", error)
    });
}