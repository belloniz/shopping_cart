export const getAllProductsDTO = (products) => {
    return products.map(product => ({
        code: product.code,
        name: product.name,
        price: product.price,
        image: product.image,
    }))
}