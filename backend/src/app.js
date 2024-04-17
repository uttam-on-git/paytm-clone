import express from 'express'
 
const app = express()

app.get('/home', (req, res) => {
    res.send('hello')
})

export { app }