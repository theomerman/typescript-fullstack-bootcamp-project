import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemCard } from './itemCard'
import { Product } from '@repo/db'

test('loads and displays item card', async () => {
    const product: Product = {
        id: 1,
        name: 'Item 1',
        description: 'Description of item 1',
        price: 100,
        SKU: 'SKU123',
        category: 'Category 1',
        stock: 100,
        image: 'https://chatgpt.com.br/wp-content/uploads/2023/03/bing-image-creator-1024x1024.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    render(<ItemCard product={product} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    product.image = null
    render(<ItemCard product={product} />)
})
