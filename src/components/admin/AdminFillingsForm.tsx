import {useState} from 'react';
import {addFilling, updateFilling} from "@/firebase/requests/fillings";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import cls from "@/styles/Admin.productFrom.module.scss";
import clsF from '@/styles/Admin.fillingForm.module.scss'

const AdminProductsForm = () => {
    const {
        setFillingProperty,
        setFillingDefault,
        setFillingCompositionItem,
        setFillingChanging,
        addFillingCompositionItem,
        removeFillingCompositionItem
    } = useActions()
    const filling = useTypedSelector(state => state.admin.filling)
    const isFillingChanging = useTypedSelector(state => state.admin.isFillingChanging)
    const prevFillingUrl = useTypedSelector(state => state.admin.prevFillingUrl)
    const [error, setError] = useState("")

    const setTitle = (value: string) => {
        setFillingProperty({property: 'title', value})
    }
    const setCompositionItem = (value: { id: number, value: string }) => {
        setFillingCompositionItem(value)
    }
    const setPrice = (value: number) => {
        setFillingProperty({property: 'price', value})
    }
    const setUrl = (value: string) => {
        if (value !== undefined)
            setFillingProperty({property: 'imgUrl', value})
    }

    const Check = () => {
        if (!filling.title) {
            setError("Введите название!")
            return false
        }
        if (!filling.composition) {
            setError("Введите описание!")
            return false
        }
        if (!filling.price) {
            setError("Введите цену!")
            return false
        }
        if (!filling.imgUrl) {
            setError("Добавьте файл!")
            return false
        }
        return true
    }

    const uploadFilling = async (e: any) => {
        e.preventDefault()
        if (!Check()) return

        await addFilling(filling)
        setFillingDefault()
        setError("")
    }

    function isValidHttpUrl(string: string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSave = async () => {
        setFillingChanging(false)

        const downloadURL = await updateFilling(filling, prevFillingUrl)
        if(downloadURL)
            setFillingProperty({property: 'imgUrl', downloadURL})
        setFillingDefault()
        setError("")
    }

    const handleCancel = () => {
        setFillingDefault()
        setFillingChanging(false)
    }
    const addHandler = () => {
        addFillingCompositionItem()
    }
    const deleteHandler = (id: number) => {
        removeFillingCompositionItem(id)
    }

    return (
        <form className={cls.productForm}>
            <div className={cls.productFormLeft}>
                <input
                    placeholder="Название..."
                    className={cls.productFormLeft__item}
                    value={filling.title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div>Состав:</div>
                <ul className={clsF.fillingComposition}>
                    {filling.composition.map((el, idx) =>
                        <li key={idx}>
                            <input
                                className={cls.productFormLeft__item}
                                type="text"
                                placeholder="Ингридиент..."
                                value={el}
                                onChange={e => setCompositionItem({id:idx, value:e.target.value})}
                            />
                            <h4 onClick={() => deleteHandler(idx)}>X</h4>
                        </li>
                    )}
                    <li>
                        <div className={clsF.composition__add} onClick={addHandler}>добавить</div>
                    </li>
                </ul>
                <h3>Цена:</h3>
                <input
                    placeholder="Цена..."
                    className={cls.productFormLeft__item}
                    type="number"
                    value={filling.price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <input
                    className={cls.productFormLeft__item}
                    type="file"
                    onChange={e => setUrl(e.target.files[0])}
                />
                <div className={cls.productFormError}>{error}</div>
                <div className={cls.productForBtns}>
                    {isFillingChanging
                        ?
                        <>
                            <div onClick={handleSave}>Сохранить</div>
                            <div onClick={handleCancel}>Отменить</div>
                        </>
                        : <div onClick={e => uploadFilling(e)}>Добавить</div>
                    }
                </div>
            </div>
            <div className={cls.productFormRight}>
                <div className={cls.productFormRight__img}>
                    <img src={isValidHttpUrl(filling.imgUrl) ? filling.imgUrl : URL.createObjectURL(filling.imgUrl)}
                         alt="img"/>
                </div>
            </div>
        </form>
    );
};

export default AdminProductsForm;