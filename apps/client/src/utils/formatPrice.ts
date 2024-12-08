function formatPrice(value: number) {
    const formater = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return formater.format(value)
}
export default formatPrice
