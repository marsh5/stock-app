const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./utils/config').pool
const financialsRouter = require('./controllers/financials');
const authRouter = require('./controllers/jwtAuth');
const portfolioRouter = require('./controllers/portfolio');
const path = require("path");

app.use(cors())
app.use(express.json());

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static("client/build"))
}

//financial page route
app.use('/api/financials', financialsRouter)

//authentication & authorization route
app.use('/auth', authRouter);

//portfolio page
app.use('/portfolio', portfolioRouter)

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'client/build')});
  });


module.exports = app;