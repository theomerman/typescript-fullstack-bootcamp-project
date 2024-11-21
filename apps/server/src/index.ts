import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import productsRoute from './routes/productRoute'
import variantsRoute from './routes/VariantRoutes'
import collectionRoutes from './routes/CollectionRoutes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/products', productsRoute)
app.use('/variants', variantsRoute)
app.use('/collections', collectionRoutes)

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server API running on http://localhost:${port}`)
})
