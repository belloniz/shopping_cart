import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/shopping_cart')
mongoose.Promise = global.Promise

export default mongoose