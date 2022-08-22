import mongoose from '../database/index.js'

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    }
})

const CartSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    total_amount: {
        type: Number,
    },
    total_itens: {
        type: Number,
    },
    products: [ProductSchema]
})

const Cart = mongoose.model('cart', CartSchema)
export default Cart