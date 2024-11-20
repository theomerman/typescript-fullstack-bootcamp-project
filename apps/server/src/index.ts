import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@repo/db'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const prisma = new PrismaClient()

app.get('/', (_, res) => {
    prisma.user.create({
        data: {
            email: 'h',
            name: 'hd',
        },
    })
    return res.json({ ok: true })
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server API running on http://localhost:${port}`)
})
