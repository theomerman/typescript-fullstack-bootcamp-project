import { Product } from '@repo/db'
import formatPrice from '../../utils/formatPrice'

type props = { product: Product }
export function ItemCard(props: props) {
    const product = props.product
    return (
        <main
            className={`bg-black h-full group p-4 border border-zinc-800 rounded-lg text-white hover:cursor-pointer hover:border-[#2930ff] flex flex-col flex-nowrap gap-6 items-center font-semibold justify-between`}
        >
            {product.image ? (
                <img
                    className="group-hover:scale-105 transition duration-300 ease-in-out rounded-lg"
                    src={product.image}
                />
            ) : (
                <img
                    className="group-hover:scale-105 transition duration-300 ease-in-out rounded-lg"
                    src="https://chatgpt.com.br/wp-content/uploads/2023/03/bing-image-creator-1024x1024.jpg"
                />
            )}
            <footer className="flex flex-row flex-nowrap gap-4 border p-2 rounded-3xl w-fit text-xs items-center border-zinc-800">
                <label className="">{product.name}</label>
                <button className="bg-blue-600 p-2 rounded-3xl">
                    {formatPrice(product.price)} USD
                </button>
            </footer>
        </main>
    )
}
