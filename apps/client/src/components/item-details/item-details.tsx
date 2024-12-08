import { Product, Variant } from '@repo/db'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './items-details.css'
import formatPrice from '../../utils/formatPrice'

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState({} as Product)
    const [variants, setVariants] = useState([] as Variant[])
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:5001/products/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setProduct(res as Product)
                setVariants(res.Variant as Variant[])
                setImage((res as Product).image!)
                setPrice((res as Product).price)
            })
    }, [id])

    return (
        <main className="p-14 border border-zinc-800 m-3 flex flex-row flex-wrap gap-9 text-white justify-center lg:flex-nowrap">
            <section className="">
                {product.image ? (
                    <img className="rounded-lg max-w-screen-sm" src={image} />
                ) : (
                    <img
                        className="group-hover:scale-105 transition duration-300 ease-in-out rounded-lg"
                        src=""
                    />
                )}
            </section>
            <section className="flex flex-col justify-center gap-5">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p>
                    <strong>Description: </strong>
                    {product.description}
                </p>
                <h2 className="bg-blue-600 p-2 rounded-3xl w-fit px-3">
                    {/* ${price} USD */}
                    {formatPrice(price)} USD
                </h2>
                <ul className="flex flex-row flex-nowrap gap-3">
                    <li
                        className="border-2 border-blue-700 w-fit p-2 rounded-3xl cursor-pointer"
                        onClick={() => {
                            setImage(product.image!)
                            setPrice(product.price)
                        }}
                    >
                        Default
                    </li>
                    {variants.map((variant) => {
                        console.log(variant)

                        return (
                            <li
                                className="border-2 border-blue-700 w-fit p-2 rounded-3xl cursor-pointer"
                                key={variant.id}
                                onClick={() => {
                                    setImage(variant.image!)
                                    setPrice(variant.price)
                                }}
                            >
                                {variant.color}
                            </li>
                        )
                    })}
                </ul>
                <button className="bg-blue-600 p-2 rounded-3xl  px-3">
                    Add to cart
                </button>
            </section>
        </main>
    )
}

export default ProductDetails
