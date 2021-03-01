const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./utils/config').pool

app.use(cors())
app.use(express.json());

app.get('/', (req,res) => {
    res.send('<h1>HEY WORLD!!</h1>')
})

app.get('/amzn', async (req,res) => {
    try {
        const amzn = await pool.query(`SELECT * FROM coinfo WHERE "Ticker"='AMZN'`);
        console.log('amzn');
        res.json(amzn.rows)
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = app;