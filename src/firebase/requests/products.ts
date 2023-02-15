import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {firestore, storage} from "../index";
import {
    collection, deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    updateDoc,
    where
} from "firebase/firestore";
import {IProduct} from "@/types";
import {OrderByDirection} from "@firebase/firestore-types";

export function AddProduct(product: IProduct) {
    const productImgRef = ref(storage, `products/product_img_${product.id}`)
    const uploadTask = uploadBytesResumable(productImgRef, <Blob><unknown>product.imgUrl)
    uploadTask.on('state_changed',
        () => {
        },
        (error) => {
            console.log("Upload image error: ", error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                product = {...product, imgUrl: <Blob><unknown>downloadURL}
                const productsRef = collection(firestore, "products");
                await setDoc(doc(productsRef, `product_${product.id}`), {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: Number(product.price),
                    weight: Number(product.weight),
                    categoryId: Number(product.categoryId),
                    imgUrl: product.imgUrl
                })
            });
        }
    );
}

export const fetchProducts = async (categoryId = 0, lmt = 6) => {

    const q = categoryId === 0
        ? query(collection(firestore, "products"), limit(lmt))
        : query(collection(firestore, "products"), where("categoryId", "==", categoryId), limit(lmt))

    const querySnapshot = await getDocs(q);

    const products: IProduct[] = []
    querySnapshot.forEach(doc => products.push(<IProduct>doc.data()));
    return products
}
export const fetchMoreProducts = async (categoryId: number, order: [string, OrderByDirection], lmt: number, lastVisible: string) => {
    let q
    if (categoryId === 0) {
        q = query(collection(firestore, "products"),
            orderBy(order[0], order[1]),
            startAfter(lastVisible),
            limit(lmt)
        )
    } else {
        q = query(collection(firestore, "products"),
            where("categoryId", "==", categoryId),
            orderBy(order[0], order[1]),
            startAfter(lastVisible),
            limit(lmt)
        )
    }

    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty)
        return []

    const products: IProduct[] = []
    querySnapshot.forEach(doc => products.push(<IProduct>doc.data()));
    return products
}
export const updateProduct = async (product: IProduct, prevProductUrl: string) => {
    const productRef = doc(firestore, "products", "product_" + product.id);
    // @ts-ignore
    if (prevProductUrl !== product.imgUrl) {
        const productImgRef = ref(storage, `products/product_img_${product.id}`)

        const uploadTask = uploadBytesResumable(productImgRef, <Blob><unknown>product.imgUrl)

        uploadTask.on('state_changed',
            () => {
            },
            (error) => {
                console.log("Upload image error: ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(productRef, {...product, imgUrl: downloadURL});
                    return downloadURL
                });
            }
        );
    } else {
        await updateDoc(productRef, product);
    }
    return false
}
export const deleteProduct = async (id: string, Url: string) => {
    const urlArr = (new URL(Url)).pathname.split("%2F")
    const url = urlArr[urlArr.length - 1]

    await deleteDoc(doc(firestore, "products", `product_${id}`));

    const productImgRef = ref(storage, `products/${url}`);
    deleteObject(productImgRef).then(() => {
        console.log("File deleted successfully")
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!", error)
    });
}