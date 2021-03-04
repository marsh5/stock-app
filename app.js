const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./utils/config').pool
const financialsRouter = require('./controllers/financials');

app.use(cors())
app.use(express.json());

app.get('/', (req,res) => {
    res.send('<h1>HEY WORLD!!</h1>')
})

app.use('/api/financials', financialsRouter)

module.exports = app;