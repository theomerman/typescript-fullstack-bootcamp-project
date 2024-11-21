import { Product } from '@repo/db'
import { ProductService } from '../services/ProductService'
import { CustomException } from '../util/CustomException'

export class ProductController {
    private productService: ProductService
    constructor(private product: Product) {
        this.productService = new ProductService(this.product)
    }
    getAllProducts() {
        return this.productService.getAllProducts()
    }
    createProduct(product: Product) {
        return this.productService.createProduct(product)
    }
    getProductById() {
        if (isNaN(this.product.id)) {
            throw new CustomException('Invalid product ID provided', 400)
        }
        return this.productService.getProductById()
    }
    updateProduct() {
        if (isNaN(this.product.id)) {
            throw new CustomException('Invalid product ID provided', 400)
        }
        return this.productService.updateProduct(this.product)
    }
    deleteProduct() {
        if (isNaN(this.product.id)) {
            throw new CustomException('Invalid product ID provided', 400)
        }
        return this.productService.deleteProduct()
    }
    setCategoryToProduct(categoryId: number) {
        if (isNaN(this.product.id)) {
            throw new CustomException('Invalid product ID provided', 400)
        }
        if (isNaN(categoryId)) {
            throw new CustomException('Invalid category ID provided', 400)
        }
        return this.productService.setCategoryToProduct(categoryId)
    }
}
