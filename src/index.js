import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'
import { createProducts } from './configuration/mongo-init.js'

createProducts()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', router)

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found!' })
})

app.listen(3000, () => {
    console.log('listening on port', 3000)
})
