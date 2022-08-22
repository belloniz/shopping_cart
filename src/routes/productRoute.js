import express from 'express'
import { getAllProducts } from "../services/productService.js"

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts()

        res.send(products)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'error while finding products' })
    }
})

export default router
