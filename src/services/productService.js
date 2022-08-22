import Product from '../models/product.js'
import { getAllProductsDTO } from '../dto/product.dto.js'

export async function getAllProducts() {
    const products = await Product.find()
    return getAllProductsDTO(products)
}
