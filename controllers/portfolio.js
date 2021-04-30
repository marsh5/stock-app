const portfolioRouter = require("express").Router();
const pool = require('../utils/config').pool
const authorization = require('../middleware/authorization');

portfolioRouter.get("/name", authorization, async (req,res) => {
    try {

         //this only gets run if authorization middleware is succesfully return. So req.user has the payload

        // const user = await pool.query("SELECT user_id, user_name FROM users WHERE user_id = $1", [req.user])

        const user = await pool.query("SELECT u.user_name, g.ticker, g.name, g.sector FROM users u LEFT JOIN favorites f ON u.user_id = f.user_id LEFT JOIN generalcoinfo g on f.ticker = g.ticker WHERE u.user_id = $1", [req.user])

        res.json(user.rows);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
    }
})

module.exports = portfolioRouter;