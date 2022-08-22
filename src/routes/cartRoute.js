import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createCart, updateCart, getCartByToken, deleteProductFromCart } from '../services/cartService.js'

const router = express.Router()

router.post('/:token?', async (req, res) => {
    try {
        let cartInfo = {
            token: req.params.token,
            code: req.body.code,
            quantity: req.body.quantity
        }

        if (!cartInfo.token) {
            cartInfo.token = uuidv4()

            const { cart, error } = await createCart(cartInfo)
            if (error) {
                res.status(400).send({ error })
                return
            }

            res.send(cart)
            return
        }

        const { cart, error } = await updateCart(cartInfo)
        if (!cart) {
            res.status(404).send({ error })
            return
        }

        if (error) {
            res.status(400).send({ error })
            return
        }

        res.send(cart)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'error creating cart' })
    }
})

router.get('/:token', async (req, res) => {
    try {
        const cartToken = req.params.token
        const { cart, error } = await getCartByToken(cartToken)
        if (error) {
            res.status(400).send({ error })
            return
        }

        res.send(cart)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'error while finding cart' })
    }
})

router.delete('/:token?/:code?', async (req, res) => {
    try {
        let cartInfo = {
            token: req.params.token,
            code: req.params.code
        }


        const { error } = await deleteProductFromCart(cartInfo)
        if (error) {
            res.status(404).send({ error })
            return
        }


        res.status(204).send()
    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: 'error while deleting product from cart' })
    }
})

export default router
