import { Product } from '@repo/db'
import { useState, useEffect } from 'react'
import { NavBar } from './components/navbar/navbar'
import Products from './components/products/products'
import { SideMenu } from './components/side-menu/side-menu'
import SortBy from './components/sort-by/sort-by'

export type templateName = {
    gridTemplateName: string
    p: Product[]
    setFun: (products: Product[]) => void
}
function App() {
    const [products, setProducts] = useState([] as Product[])

    useEffect(() => {
        fetch('http://localhost:5001/products')
            .then((res) => res.json())
            .then((res: Product[]) => setProducts(res))
    }, [])

    return (
        <main className="px-3 grid main-container">
            <NavBar
                gridTemplateName="nav-bar"
                p={products}
                setFun={setProducts}
            />
            <SideMenu
                gridTemplateName="left-menu"
                p={products}
                setFun={setProducts}
            />
            <Products
                gridTemplateName="content"
                p={products}
                setFun={setProducts}
            />
            <SortBy
                gridTemplateName="right-menu"
                p={products}
                setFun={setProducts}
            />
        </main>
    )
}

export default App
