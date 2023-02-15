import {useEffect} from 'react';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {addCategory, deleteCategory, fetchCategories, updateCategory} from "@/firebase/requests/categories";
import cls from '@/styles/Admin.category.module.scss'

const AdminFillings = () => {
    const {setCategoryDefault, setCategoryProperty, setCategoryChanging, setCategories} = useActions()
    const categories = useTypedSelector(state => state.products.categories)//.filter(el => el.id !== 0)
    const isCategoryChanging = useTypedSelector(state => state.admin.isCategoryChanging)
    const category = useTypedSelector(state => state.admin.category)

    const setTitle = (value: string) => {
        setCategoryProperty({property: 'title', value})
    }
    const addHandler = () => {
        addCategory(category)
        if(categories.length === 0) return
        // @ts-ignore
        const id = categories.at(-1).id > category.id ? categories.at(-1).id + 1 : category.id + 1
        setCategoryDefault(id)
        setTimeout(fetchData, 1000)
    }
    const changeHandler = (id: number, title: string) => {
        setCategoryChanging(true)
        setCategoryProperty({property: 'id', value: id})
        setTitle(title)
    }
    const saveHandler = () => {
        updateCategory(category)
        if(categories.length === 0) return
        // @ts-ignore
        const id = categories.at(-1).id > category.id ? categories.at(-1).id + 1 : category.id + 1
        setCategoryDefault(id)
        setTimeout(fetchData, 1000)
        setCategoryChanging(false)
    }
    const cancelHandler = () => {
        setCategoryChanging(false)
        if(categories.length === 0) return
        // @ts-ignore
        const id = categories.at(-1).id + 1
        setCategoryDefault(id)
    }
    const deleteHandler = (id: number) => {
        deleteCategory(id)
        if(categories.length === 0) return
        setCategoryDefault(id)
        setTimeout(fetchData, 1000)
    }

    async function fetchData() {
        let categories = await fetchCategories()
        if(categories.length === 0) return
        setCategories(categories)
        // @ts-ignore
        setCategoryDefault(categories.at(-1).id + 1)
    }
    useEffect(()=>{
        if(categories.length === 0) return
        // @ts-ignore
        const value = categories.at(-1).id + 1
        setCategoryProperty({property: 'id', value})
    }, [])

    return (
        <div className={cls.categoriesContent}>
            <div>
                <div className={cls.categoriesContentTop}>
                    <input type="text" value={category.title} onChange={e => setTitle(e.target.value)}/>
                    {isCategoryChanging
                        ? <div style={{display: "flex"}}>
                            <div className={cls.categoryBtn} onClick={saveHandler}>Сохранить</div>
                            <div className={cls.categoryBtn} onClick={cancelHandler}>Отменить</div>
                        </div>
                        : <div className={cls.categoryBtn} onClick={addHandler}>Добавить</div>}
                </div>
                <ul className={cls.categoriesContentList}>
                    {categories.map(cat =>
                        <li key={cat.id}>
                            {cat.title}
                            <div className={cls.categoryBtns}>
                                <div className={cls.categoryBtn}
                                     onClick={() => changeHandler(cat.id, cat.title)}>изменить
                                </div>
                                <div className={cls.categoryBtn} onClick={() => deleteHandler(cat.id)}>удалить</div>
                            </div>
                        </li>)}
                </ul>
            </div>
        </div>
    );
};

export default AdminFillings;