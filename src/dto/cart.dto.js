export const getCartDTO = (cart) => {
    return {
        token: cart.token,
        total_amount: cart.total_amount,
        total_itens: cart.total_itens,
        products: cart.products.map(product => ({
            code: product.code,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity,
        }))
    }
}