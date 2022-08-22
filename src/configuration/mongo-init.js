import logger from './logger.js'
import Product from '../models/product.js'

const products = [
    {
        "code": "minimal-top",
        "image": "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/12_84036fc8-f5f9-48ab-a236-1ff4ba9cb38a_450x.png?v=1660254301",
        "price": 119,
        "name": "Minimal Top"
    },
    {
        "code": "tech-t-shirt",
        "price": 136,
        "name": "Tech T-Shirt",
        "image": "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/TechTShirt_Preta-04_400x.jpg?v=1652290336"
    },
    {
        "name": "Tech t-shirt Gola V",
        "price": 140,
        "code": "tech-t-shirt-gola-v",
        "image": "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/4_5_400x.jpg?v=1659463010"
    },
    {
        "code": "wingsuit",
        "name": "Wingsuit",
        "price": 389,
        "image": "https://cdn.shopify.com/s/files/1/0526/4123/5093/products/1_bfa6bf3c-76b7-4ec5-8d96-60c02ca70ff1_400x.png?v=1660151630"
    }
]

export async function createProducts() {
    try {
        const result = await Product.find()
        if (result.length > 0) {
            logger.info('products already added to the database, continuing...')
            return
        }
    } catch (err) {
        logger.error(err)
    }

    logger.info('products not found, adding products to the database...')

    for (const product of products) {
        try {
            const result = await Product.create(product)
        } catch (err) {
            logger.error(err)
        }
    }
    return
}
