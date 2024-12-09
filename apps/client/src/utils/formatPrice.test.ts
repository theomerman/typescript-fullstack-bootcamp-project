import formatPrice from './formatPrice'

describe('formatPrice', () => {
    it('should format price', () => {
        const result = formatPrice(100)
        expect(result).toBe('$100.00')
    })
    it('should format negative price', () => {
        const result = formatPrice(-100)
        expect(result).toBe('-$100.00')
    })
    it('should format price wih 0', () => {
        const result = formatPrice(0)
        expect(result).toBe('$0.00')
    })
    it('should use currency USD Intl.NumberFormat', () => {
        const spy = jest.spyOn(Intl, 'NumberFormat')
        formatPrice(100)
        expect(spy).toHaveBeenCalled()
    })
    it('should use currency USD Intl.NumberFormat with options', () => {
        const spy = jest.spyOn(Intl, 'NumberFormat')
        formatPrice(100)
        expect(spy).toHaveBeenCalledWith('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    })
})
