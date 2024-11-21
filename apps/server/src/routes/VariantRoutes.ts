import { Variant } from '@repo/db'
import { Router } from 'express'
import { VariantController } from '../controllers/VariantController'
import { CustomException } from '../util/CustomException'

const variantRoutes: Router = Router()
variantRoutes.get('/', async (req, res) => {
    const variantController = new VariantController({} as Variant)
    try {
        const variants = await variantController.getVariants()
        res.status(200).json(variants)
    } catch (e) {
        res.status(500).json('Internal server error')
    }
})
variantRoutes.get('/:id', async (req, res) => {
    const variantController = new VariantController({
        id: Number(req.params.id),
    } as Variant)
    try {
        const variant = await variantController.getVariant()
        res.status(200).json(variant)
    } catch (e) {
        if (e instanceof CustomException) {
            res.status(e.status).json(e.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})
variantRoutes.post('/', async (req, res) => {
    const variant = req.body as Variant
    const variantController = new VariantController(variant)
    try {
        const newVariant = await variantController.createVariant()
        res.status(201).json(newVariant)
    } catch (e) {
        if (e instanceof CustomException) {
            res.status(e.status).json(e.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})

variantRoutes.put('/:id', async (req, res) => {
    const variant = req.body as Variant
    const variantController = new VariantController(variant)
    try {
        const newVariant = await variantController.updateVariant(req.params.id)
        res.status(201).json(newVariant)
    } catch (e) {
        if (e instanceof CustomException) {
            res.status(e.status).json(e.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})

variantRoutes.delete('/:id', async (req, res) => {
    const variantController = new VariantController({
        id: Number(req.params.id),
    } as Variant)
    try {
        await variantController.deleteVariant()
        res.status(200).json('Variant deleted successfully')
    } catch (e) {
        if (e instanceof CustomException) {
            res.status(e.status).json(e.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})

export default variantRoutes
