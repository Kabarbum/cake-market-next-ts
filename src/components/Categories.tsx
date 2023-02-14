import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";
import {useTypedDispatch} from "@/hooks/useTypedDispatch";
import {getProducts} from "@/store/slices/product/asyncActions";

function Categories() {
    const {setCategoryId} = useActions()

    const categories = useTypedSelector(state => state.products.categories)
    const selectedCategoryId = useTypedSelector(state => state.products.selectedCategoryId)
    const limit = useTypedSelector(state => state.products.limit)

    const router = useRouter();
    const dispatch = useTypedDispatch()
    const setCategory = async (categoryId: number) => {
        setCategoryId(categoryId)
        await router.replace({
            query: {...router.query, category: categoryId},
        });
        dispatch(getProducts({limit, selectedCategoryId: categoryId}))
    }

    return (
        <div className="categories">
            {categories.map(el =>
                <span
                    className={el.id === selectedCategoryId ? "category__item active" : "category__item"}
                    key={el.id}
                    onClick={() => setCategory(el.id)}
                >
                    {el.title}</span>
            )}
            <style jsx>
                {`
                  .categories {
                    display: flex;
                    flex-wrap: wrap;
                  }

                  .category__item {
                    margin-top: 5px;
                    padding: 10px 15px;
                    border-radius: 15px;
                    background-color: rgba(125, 125, 125, .6);
                    color: #eee;
                    font-family: var(--chalk-font);
                    cursor: pointer;
                    transition: .3s;
                  }

                  .category__item:not(:last-child) {
                    margin-right: 10px;
                  }

                  .category__item:hover, .category__item.active {
                    background-color: rgba(160, 160, 160, .6);
                    color: var(--orange);
                  }
                `}
            </style>
        </div>
    );
}

export default Categories;