import formatPrice from './formatPrice'

describe('formatPrice', () => {
    test('should format price', () => {
        const result = formatPrice(100)
        expect(result).toBe('$100.00')
    })
})
