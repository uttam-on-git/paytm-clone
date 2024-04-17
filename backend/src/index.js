import dotenv from 'dotenv'

import { app } from './app.js'
import connectDB from './db/db.js'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8001, () => {
        console.log(`Server is running at port: ${process.env.PORT} `)
    })
})
.catch((err) => {
    console.log('MONGODB connection failed !!', err)
})