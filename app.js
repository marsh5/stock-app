const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./utils/config').pool
const financialsRouter = require('./controllers/financials');

app.use(cors())
app.use(express.json());

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static("client/build"))
}

app.get('/', (req,res) => {
    res.send('<h1>HEY WORLD!!</h1>')
})

app.use('/api/financials', financialsRouter)

module.exports = app;