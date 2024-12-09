import { Product } from '@repo/db'
import { templateName } from '../../App'

export default function SortBy(props: templateName) {
    const sortBy = ['Price: Low to high', 'Price: High to low']

    return (
        <menu className={`${props.gridTemplateName} text-white px-4`}>
            <ul className="flex flex-col flex-nowrap gap-2">
                <h1 className="text-[#808080]">Sort by</h1>
                {sortBy.map((sortingOption: string) => (
                    <li
                        className="cursor-pointer"
                        key={sortingOption}
                        onClick={() => {
                            props.setFun(sortProducts(props.p, sortingOption))
                        }}
                    >
                        {sortingOption}
                    </li>
                ))}
            </ul>
        </menu>
    )
}
function sortProducts(products: Product[], sortBy: string): Product[] {
    if (sortBy === 'Price: Low to high') {
        const newArray = products.sort((a, b) => a.price - b.price) as Product[]
        return newArray.map((item) => item)
    } else if (sortBy === 'Price: High to low') {
        const newArray = products.sort((a, b) => b.price - a.price) as Product[]
        return newArray.map((item) => item)
    }
    return products
}
