import MainContainer from "@/components/MainContainer";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import {ICategory, IProduct} from "@/types";
import {fetchProducts} from "@/firebase/requests/products";
import {fetchCategories} from "@/firebase/requests/categories";
import {FC, useEffect} from "react";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";

interface HomeProps {
    products: IProduct[]
    categories: ICategory[]
}

const Home: FC<HomeProps> = ({products, categories}) => {
    const router = useRouter()
    const {setProducts, setCategories, setCategoryId, setLastVisible} = useActions()
    useEffect(() => {
        const id = Number(router.query.category) || 0
        setCategoryId(id)
        setCategories(categories)

        setProducts(products)
        setLastVisible(products.at(-1)?.id || '0')
        return () => {
            setLastVisible('0')
        }
    }, [])

    return (
        <MainContainer>
            <div className="container">
                <Categories/>
                <Products/>
            </div>
        </MainContainer>
    )
}
export default Home;
export const getServerSideProps = async (context: { query: any; }) => {
    const {query} = context
    const category = Number(query.category) || 0
    const products = await fetchProducts(category)
    const categories = await fetchCategories()
    return {
        props: {products, categories},
    }
}