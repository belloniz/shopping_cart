import { Router } from 'express'
import productRoute from './productRoute.js'
import cartRoute from './cartRoute.js'

const router = Router()

router.use('/products', productRoute)
router.use('/cart', cartRoute)

export default router