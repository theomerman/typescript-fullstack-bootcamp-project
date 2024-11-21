import { Collection } from '@repo/db'
import { Router } from 'express'
import { CollectionController } from '../controllers/CollectionController'
import { CustomException } from '../util/CustomException'

const collectionRoutes: Router = Router()

collectionRoutes.post('/', async (req, res) => {
    const collectionController = new CollectionController(
        req.body as Collection,
    )
    try {
        const collection = await collectionController.createCollection()
        res.status(201).json(collection)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json(err.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})
collectionRoutes.get('/:id', async (req, res) => {
    const collectionController = new CollectionController({
        id: Number(req.params.id),
    } as Collection)
    try {
        const collection = await collectionController.getCollection()
        res.status(200).json(collection)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json(err.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})
collectionRoutes.get('/', async (req, res) => {
    const collectionController = new CollectionController({} as Collection)
    try {
        const collections = await collectionController.getCollections()
        res.status(200).json(collections)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json(err.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})
collectionRoutes.put('/:id', async (req, res) => {
    const collectionController = new CollectionController({
        id: Number(req.params.id),
        ...req.body,
    } as Collection)
    try {
        const collection = await collectionController.updateCollection()
        res.status(200).json(collection)
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json(err.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})
collectionRoutes.delete('/:id', async (req, res) => {
    const collectionController = new CollectionController({
        id: Number(req.params.id),
    } as Collection)
    try {
        await collectionController.deleteCollection()
        res.status(200).json('Collection deleted successfully')
    } catch (err) {
        if (err instanceof CustomException) {
            res.status(err.status).json(err.message)
        } else {
            res.status(500).json('Internal server error')
        }
    }
})

export default collectionRoutes
