import Cart from '../models/cart.js'
import Product from '../models/product.js'
import { getCartDTO } from '../dto/cart.dto.js'

export async function createCart(cartInput) {
    if (!cartInput.quantity || cartInput.quantity <= 0) {
        return { "error": "quantity cant be null or zero" }
    }

    const product = await Product.findOne({ code: cartInput.code })
    if (!product) {
        return { "error": "product not found" }
    }

    const totalAmount = product.price * cartInput.quantity

    const cart = await Cart.create({
        token: cartInput.token,
        total_amount: totalAmount,
        total_itens: cartInput.quantity,
        products: [{
            code: product.code,
            image: product.image,
            price: totalAmount,
            name: product.name,
            quantity: cartInput.quantity,
        }],
    })
    if (!cart) {
        return { "error": "error while creating cart" }
    }

    return { cart: getCartDTO(cart) }
}

export async function updateCart(cartInput) {
    if (!cartInput.quantity || cartInput.quantity <= 0) {
        return { "error": "quantity cant be null or zero" }
    }

    const cart = await Cart.findOne({ token: cartInput.token })
    if (!cart) {
        return { "error": "cart not found" }
    }

    const product = await Product.findOne({ code: cartInput.code })
    if (!product) {
        return { "error": "product not found" }
    }

    let totalAmount = 0
    let totalItens = 0
    let productAlreadyInCart = false
    cart.products = cart.products.map(cartProduct => {
        if (cartProduct.code == product.code) {
            cartProduct.quantity += cartInput.quantity
            cartProduct.price = cartProduct.quantity * product.price
            productAlreadyInCart = true
        }

        totalAmount += cartProduct.price
        totalItens += cartProduct.quantity

        return cartProduct
    })

    if (!productAlreadyInCart) {
        cart.products.push({
            code: product.code,
            image: product.image,
            price: cartInput.quantity * product.price,
            name: product.name,
            quantity: cartInput.quantity,
        })
        totalAmount += product.price * cartInput.quantity
        totalItens += cartInput.quantity
    }

    const productQuantity = cart.products.find(cartProduct => (cartProduct.quantity > 10))
    if (productQuantity) {
        return { "error": "product quantity can't be greater than 10" }
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { token: cartInput.token },
        {
            $set: {
                total_amount: totalAmount,
                total_itens: totalItens,
                products: cart.products,
            }
        },
        { returnDocument: 'after' }
    )

    return { cart: getCartDTO(updatedCart) }
}

export async function getCartByToken(tokenInput) {
    const cart = await Cart.findOne({ token: tokenInput })
    if (!cart) {
        return { "error": "cart not found" }
    }
    return { cart: getCartDTO(cart) }
}

export async function deleteProductFromCart(cartInput) {
    const cart = await Cart.findOne({ token: cartInput.token })
    if (!cart) {
        return { "error": "cart not found" }
    }

    const productToDelete = cart.products.find(cartProduct => (cartProduct.code === cartInput.code))
    if (!productToDelete) {
        return { "error": "product not found in cart" }
    }

    const newTotalItens = cart.total_itens - productToDelete.quantity
    const newTotalAmount = cart.total_amount - productToDelete.price
    const newProducts = cart.products.filter(cartProduct => (cartProduct.code != cartInput.code))

    const updatedCart = await Cart.findOneAndUpdate(
        { token: cartInput.token },
        {
            $set: {
                total_amount: newTotalAmount,
                total_itens: newTotalItens,
                products: newProducts,
            }
        }
    )

    return {}
}
