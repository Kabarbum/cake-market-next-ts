import {useState} from 'react';
import {AddProduct, updateProduct} from "@/firebase/requests/products";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import cls from '@/styles/Admin.productFrom.module.scss'
import {useActions} from "@/hooks/useActions";

const AdminProductsForm = () => {
    const {setProductProperty, setProductChanging, setProductDefault} = useActions()
    const categories = useTypedSelector(state => state.products.categories).filter(cat => cat.id !== 0)
    const product = useTypedSelector(state => state.admin.product)
    const isProductChanging = useTypedSelector(state => state.admin.isProductChanging)
    const prevProductUrl = useTypedSelector(state => state.admin.prevProductUrl)
    const [error, setError] = useState("")

    const setTitle = (value: string) => {
        setProductProperty({property: 'title', value})
    }
    const setDescription = (value: string) => {
        setProductProperty({property: 'description', value})
    }
    const setPrice = (value: number) => {
        setProductProperty({property: 'price', value})
    }
    const setWeight = (value: number) => {
        setProductProperty({property: 'weight', value})
    }
    const setCategoryId = (value: number) => {
        setProductProperty({property: 'categoryId', value})
    }
    const setUrl = (value: File | null) => {
        if(value !== undefined) {
            setProductProperty({property: 'imgUrl', value})
            }
    }

    const Check = () => {
        if (!product.title) {
            setError("Введите название!")
            return false
        }
        if (!product.description) {
            setError("Введите описание!")
            return false
        }
        if (!product.price) {
            setError("Введите цену!")
            return false
        }
        if (!product.weight) {
            setError("Введите вес!")
            return false
        }
        if (!product.categoryId) {
            setError("Выберите категорию!")
            return false
        }
        if (!product.imgUrl) {
            setError("Добавьте файл!")
            return false
        }
        return true
    }

    const uploadProduct = (e: any) => {
        e.preventDefault()
        if (!Check()) return

        AddProduct(product)
        setProductDefault()
        setError("")
    }

    function isValidHttpUrl(string: string) {
        let url;
        try {url = new URL(string);} catch (_) {return false;}
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSave = async () => {
        setProductChanging(false)

        const downloadURL = await updateProduct(product, prevProductUrl)
        if(downloadURL)
            setProductProperty({property: 'imgUrl', downloadURL})
        setProductDefault()
        setError("")
    }

    const handleCancel = () => {
        setProductDefault()
        setProductChanging(false)
    }
    return (
        <form className={cls.productForm}>
            <div className={cls.productFormLeft}>
                <input
                    placeholder="Название..."
                    className={cls.productFormLeft__item}
                    value={product.title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание..."
                    className={cls.productFormLeft__item}
                    value={product.description}
                    onChange={e => setDescription(e.target.value)}
                />
                <h3>Цена:</h3>
                <input
                    placeholder="Цена..."
                    className={cls.productFormLeft__item}
                    type="number"
                    value={product.price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <h3>Вес:</h3>
                <input
                    placeholder="Вес..."
                    className={cls.productFormLeft__item}
                    type="number"
                    value={product.weight}
                    onChange={e => setWeight(Number(e.target.value))}
                />
                <select
                    className={cls.productFormLeft__item}
                    value={product.categoryId}
                    onChange={e => setCategoryId(Number(e.target.value))}
                >
                    {categories.map(cat =>
                        <option
                            value={cat.id}
                            key={cat.id}
                        >{cat.title}</option>)}
                </select>
                <input
                    className={cls.productFormLeft__item}
                    type="file"
                    onChange={e => setUrl(e.target.files && e.target.files[0])}
                />
                <div className={cls.productFormError}>{error}</div>
                <div className={cls.productForBtns}>
                    {isProductChanging
                        ?
                        <>
                            <div onClick={handleSave}>Сохранить</div>
                            <div onClick={handleCancel}>Отменить</div>
                        </>
                        : <div onClick={e => uploadProduct(e)}>Добавить</div>
                    }
                </div>
            </div>
            <div className={cls.productFormRight}>
                <div className={cls.productFormRight__img}>
                    <img src={isValidHttpUrl(product.imgUrl) ? product.imgUrl : URL.createObjectURL(product.imgUrl)}
                         alt="img"/>
                </div>
            </div>
        </form>
    );
};

export default AdminProductsForm;