import { Collection, Prisma, PrismaClient } from '@repo/db'
import { CustomException } from '../util/CustomException'

export class CollectionService {
    collectionRepository = new PrismaClient().collection
    productRepository = new PrismaClient().product
    constructor(private collection: Collection) {}

    async createCollection() {
        return this.collectionRepository
            .create({
                data: this.collection,
            })
            .then((collection) => {
                return collection
            })
            .catch((err) => {
                if (err.code === 'P2002') {
                    throw new CustomException('Collection already exists', 400)
                } else if (err.code === 'P2003') {
                    throw new CustomException(
                        'Collection name already exists',
                        400,
                    )
                } else if (err.code === 'P2004') {
                    throw new CustomException(
                        'Collection name is required',
                        400,
                    )
                } else if (err instanceof Prisma.PrismaClientValidationError) {
                    throw new CustomException(
                        'Invalid data provided or missing required data',
                        500,
                    )
                }
                throw err
            })
    }
    async getCollection() {
        return this.collectionRepository
            .findUnique({
                where: {
                    id: this.collection.id,
                },
            })
            .then((collection) => {
                if (!collection) {
                    throw new CustomException('Collection not found', 404)
                }
                return collection
            })
            .catch((err) => {
                throw err
            })
    }
    async getCollections() {
        return this.collectionRepository
            .findMany()
            .then((collections) => {
                return collections
            })
            .catch((err) => {
                throw err
            })
    }
    async updateCollection() {
        return this.collectionRepository
            .update({
                where: {
                    id: this.collection.id,
                },
                data: this.collection,
            })
            .then((collection) => {
                if (collection === null) {
                    throw new CustomException(
                        'Product with the provided ID does not exist',
                        404,
                    )
                }
                return collection
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
                throw err
            })
    }
    async deleteCollection() {
        return this.collectionRepository
            .delete({
                where: {
                    id: this.collection.id,
                },
            })
            .then((collection) => {
                return collection
            })
            .catch((err) => {
                if (err.code === 'P2025') {
                    throw new CustomException('Collection not found', 404)
                }

                throw err
            })
    }
    async getProductsByCollection() {
        if (this.collection.name === 'All') {
            return this.productRepository.findMany()
        }
        return this.collectionRepository
            .findUnique({
                where: {
                    name: this.collection.name,
                },
                include: {
                    products: true,
                },
            })
            .then((collection) => {
                if (!collection) {
                    throw new CustomException('Collection not found', 404)
                }

                return collection.products
            })
            .catch((err) => {
                throw err
            })
    }
}
