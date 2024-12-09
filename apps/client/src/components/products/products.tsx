import { Link } from 'react-router-dom'
import { templateName } from '../../App'
import { ItemCard } from '../item-card/itemCard'
import './products.css'

export default function Products(props: templateName) {
    return (
        <main className={`${props.gridTemplateName} grid content`}>
            {props.p.map((product) => {
                return (
                    <Link to={`/item/${product.id}`} key={product.id}>
                        <ItemCard key={product.id} product={product} />
                    </Link>
                )
            })}
        </main>
    )
}
