import { Prisma, PrismaClient, Product } from '@repo/db'
import e from 'cors'
import { CustomException } from '../util/CustomException'

export class ProductService {
    private productRepository: PrismaClient = new PrismaClient()
    constructor(private product: Product) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.product
            .findMany()
            .then((products: Product[]): Product[] => {
                return products
            })
            .catch((err) => {
                throw err
            })
    }
    async createProduct(product: Product): Promise<Product> {
        return this.productRepository.product
            .create({ data: product })
            .then((product: Product): Product => {
                return product
            })
            .catch((err) => {
                if (err.code === 'P2002') {
                    throw new CustomException(
                        'The SKU provided is already in use',
                        500,
                    )
                } else if (err.code === 'P2003') {
                    throw new CustomException(
                        'The UPC provided is already in use',
                        500,
                    )
                } else if (err instanceof Prisma.PrismaClientValidationError) {
                    throw new CustomException(
                        'Invalid data provided or missing required data',
                        500,
                    )
                }
                throw e
            })
    }
    async getProductById(): Promise<Product> {
        return this.productRepository.product
            .findFirst({ where: { id: this.product.id } })
            .then((product) => {
                if (product === null) {
                    throw new CustomException(
                        'Product with the provided ID does not exist',
                        404,
                    )
                }
                return product
            })
            .catch((err) => {
                throw err
            })
    }
    async updateProduct(product: Product): Promise<Product> {
        return this.productRepository.product
            .update({
                where: { id: product.id },
                data: product,
            })
            .then((product) => {
                if (product === null) {
                    throw new CustomException(
                        'Product with the provided ID does not exist',
                        404,
                    )
                }
                return product
            })
            .catch((err) => {
                if (err.code === 'P2002') {
                    throw new CustomException(
                        'The SKU provided is already in use',
                        500,
                    )
                } else if (err.code === 'P2003') {
                    throw new CustomException(
                        'The product ID provided does not exist',
                        500,
                    )
                } else if (err.code === 'P2011') {
                    throw new CustomException(
                        'The product ID provided does not exist',
                        500,
                    )
                } else if (err instanceof Prisma.PrismaClientValidationError) {
                    throw new CustomException(
                        'Invalid data provided or missing required data',
                        500,
                    )
                } else if (err.code === 'P2025') {
                    throw new CustomException(
                        'The variant ID provided does not exist',
                        500,
                    )
                }
                throw e
            })
    }
    async deleteProduct(): Promise<Product> {
        return this.productRepository.product
            .delete({ where: { id: this.product.id } })
            .then((product) => {
                if (product === null) {
                    throw new CustomException(
                        'Product with the provided ID does not exist',
                        404,
                    )
                }
                return product
            })
            .catch((err) => {
                console.log(err)

                throw err
            })
    }
    async setCategoryToProduct(categoryId: number): Promise<Product> {
        return this.productRepository.product
            .update({
                where: { id: this.product.id },
                data: {
                    collection: {
                        connect: { id: categoryId },
                    },
                },
            })
            .then((product) => {
                if (product === null) {
                    throw new CustomException(
                        'Product with the provided ID does not exist',
                        404,
                    )
                }
                return product
            })
            .catch((err) => {
                if (err.code === 'P2025') {
                    throw new CustomException(
                        'The category ID provided does not exist',
                        500,
                    )
                } else if (err.code === 'P2016') {
                    throw new CustomException(
                        'The product ID provided does not exist',
                        500,
                    )
                }
                console.log(err)

                throw err
            })
    }
}
