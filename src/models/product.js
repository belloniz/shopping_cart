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
    }
})

const Product = mongoose.model('Product', ProductSchema)
export default Product