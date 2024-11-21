import { Prisma, PrismaClient, Variant } from '@repo/db'
import { CustomException } from '../util/CustomException'

export class VariantService {
    private variantRepository = new PrismaClient().variant
    constructor(private variant: Variant) {}
    async getVariants(): Promise<Variant[]> {
        return this.variantRepository
            .findMany()
            .then((variants) => {
                return variants
            })
            .catch((e) => {
                throw e
            })
    }

    async createVariant(): Promise<Variant> {
        return this.variantRepository
            .create({
                data: this.variant,
            })
            .then((variant) => {
                return variant
            })
            .catch((e) => {
                console.log(e)

                if (e.code === 'P2002') {
                    throw new CustomException(
                        'The SKU provided is already in use',
                        500,
                    )
                } else if (e.code === 'P2003') {
                    throw new CustomException(
                        'The UPC provided is already in use',
                        500,
                    )
                } else if (e.code === 'P2011') {
                    throw new CustomException(
                        'The product ID provided does not exist',
                        500,
                    )
                } else if (e instanceof Prisma.PrismaClientValidationError) {
                    throw new CustomException(
                        'Invalid data provided or missing required data',
                        500,
                    )
                }

                throw e
            })
    }
    async updateVariant(): Promise<Variant> {
        return this.variantRepository
            .update({
                where: { id: this.variant.id },
                data: this.variant,
            })
            .then((variant) => {
                return variant
            })
            .catch((e) => {
                if (e.code === 'P2002') {
                    throw new CustomException(
                        'The SKU provided is already in use',
                        500,
                    )
                } else if (e.code === 'P2003') {
                    throw new CustomException(
                        'The UPC provided is already in use',
                        500,
                    )
                } else if (e.code === 'P2011') {
                    throw new CustomException(
                        'The product ID provided does not exist',
                        500,
                    )
                } else if (e instanceof Prisma.PrismaClientValidationError) {
                    throw new CustomException(
                        'Invalid data provided or missing required data',
                        500,
                    )
                } else if (e.code === 'P2025') {
                    throw new CustomException(
                        'The variant ID provided does not exist',
                        500,
                    )
                }
                throw e
            })
    }
    async getVariant(): Promise<Variant> {
        return this.variantRepository
            .findFirst({
                where: { id: this.variant.id },
            })
            .then((variant) => {
                if (variant === null) {
                    throw new CustomException(
                        'The variant ID provided does not exist',
                        500,
                    )
                }
                return variant
            })
            .catch((e) => {
                throw e
            })
    }
    async deleteVariant(): Promise<Variant> {
        return this.variantRepository
            .delete({
                where: { id: this.variant.id },
            })
            .then((variant) => {
                return variant
            })
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new CustomException(
                        'The variant ID provided does not exist',
                        500,
                    )
                }
                throw e
            })
    }
}
