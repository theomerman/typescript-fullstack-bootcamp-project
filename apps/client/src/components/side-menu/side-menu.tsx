import { Collection, Product } from '@repo/db'
import { useEffect, useState } from 'react'
import { templateName } from '../../App'

export function SideMenu(prop: templateName) {
    const [currentCollection, setCollection] = useState('All')
    const [collections, setCollections] = useState([''])

    useEffect(() => {
        fetch('http://localhost:5001/collections')
            .then((response) => response.json())
            .then((data: Collection[]) => {
                data.unshift({ name: 'All' } as Collection)
                setCollections(data.map((collection) => collection.name))
            })
    }, [])
    prop.setFun(useGetProductsByCollection(currentCollection))

    return (
        <menu className={`${prop.gridTemplateName} text-white px-4`}>
            <ul className="flex flex-col flex-nowrap gap-2">
                <h1 className="text-[#808080]">Collections</h1>
                {collections.map((collection) => (
                    <li
                        className="cursor-pointer"
                        key={collection}
                        onClick={() => setCollection(collection)}
                    >
                        {collection}
                    </li>
                ))}
            </ul>
        </menu>
    )
}
function useGetProductsByCollection(collection: string) {
    const [products, setProducts] = useState([{} as Product])
    useEffect(() => {
        fetch(`http://localhost:5001/collections/by/${collection}`)
            .then((response) => response.json())
            .then((data: Product[]) => setProducts(data))
    }, [collection])

    return products
}
