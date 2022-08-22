import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'
import { createProducts } from './configuration/mongo-init.js'
import logger from './configuration/logger.js'
import httpLogger from './configuration/httpLogger.js'

createProducts()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(httpLogger)

app.use('/', router)

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found!' })
})

app.listen(3000, () => {
    logger.info('application started, listening on port 3000')
})
