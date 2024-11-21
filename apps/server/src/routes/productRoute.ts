import { Router } from 'express'
import { ProductController } from '../controllers/productController'
import { Product } from '@repo/db'
import { CustomException } from '../util/CustomException'

const productsRoute: Router = Router()

productsRoute.get('/', async (_, res) => {
    const productController = new ProductController({} as Product)
    try {
        const products = await productController.getAllProducts()
        res.status(200).json(products)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})
productsRoute.post('/', async (req, res) => {
    const productController = new ProductController({} as Product)
    try {
        const product = await productController.createProduct(req.body)
        res.status(201).json(product)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})
productsRoute.get('/:id', async (req, res) => {
    const productController = new ProductController({
        id: Number(req.params.id),
    } as Product)
    try {
        const product = await productController.getProductById()
        res.status(200).json(product)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})
productsRoute.put('/:id', async (req, res) => {
    const productController = new ProductController({
        id: Number(req.params.id),
        ...req.body,
    } as Product)
    try {
        const product = await productController.updateProduct()
        res.status(200).json(product)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})
productsRoute.delete('/:id', async (req, res) => {
    const productController = new ProductController({
        id: Number(req.params.id),
    } as Product)
    try {
        await productController.deleteProduct()
        res.status(200).json('Product deleted successfully')
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})
productsRoute.post('/:id/:category', async (req, res) => {
    const productController = new ProductController({
        id: Number(req.params.id),
    } as Product)
    try {
        const products = await productController.setCategoryToProduct(
            Number(req.params.category),
        )
        res.status(200).json(products)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
})

export default productsRoute
