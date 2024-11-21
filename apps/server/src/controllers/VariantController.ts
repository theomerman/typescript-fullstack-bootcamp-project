import { Variant } from '@repo/db'
import { VariantService } from '../services/VariantService'
import { CustomException } from '../util/CustomException'

export class VariantController {
    private variantService
    constructor(private variant: Variant) {
        this.variantService = new VariantService(this.variant)
    }
    public async getVariants() {
        return await this.variantService.getVariants()
    }
    public async createVariant() {
        return await this.variantService.createVariant()
    }
    public async updateVariant(id: string) {
        this.variant.id = Number(id)
        if (isNaN(this.variant.id)) {
            throw new CustomException('Invalid id', 400)
        }
        return await this.variantService.updateVariant()
    }
    public async deleteVariant() {
        if (isNaN(this.variant.id)) {
            throw new CustomException('Invalid id', 400)
        }
        return await this.variantService.deleteVariant()
    }
    public async getVariant() {
        if (isNaN(this.variant.id)) {
            throw new CustomException('Invalid id', 400)
        }
        return await this.variantService.getVariant()
    }
}
