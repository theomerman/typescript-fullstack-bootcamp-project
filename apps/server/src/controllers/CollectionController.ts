import { Collection } from '@repo/db'
import { CollectionService } from '../services/CollectionService'
import { CustomException } from '../util/CustomException'

export class CollectionController {
    private collectionService: CollectionService
    constructor(private collection: Collection) {
        this.collectionService = new CollectionService(this.collection)
    }
    createCollection() {
        return this.collectionService.createCollection()
    }
    getCollection() {
        if (isNaN(this.collection.id)) {
            throw new CustomException('Invalid collection ID', 400)
        }
        return this.collectionService.getCollection()
    }
    getCollections() {
        return this.collectionService.getCollections()
    }
    updateCollection() {
        if (isNaN(this.collection.id)) {
            throw new CustomException('Invalid collection ID', 400)
        }
        return this.collectionService.updateCollection()
    }
    deleteCollection() {
        if (isNaN(this.collection.id)) {
            throw new CustomException('Invalid collection ID', 400)
        }
        return this.collectionService.deleteCollection()
    }
}
