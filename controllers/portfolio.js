const portfolioRouter = require("express").Router();
const pool = require('../utils/config').pool
const authorization = require('../middleware/authorization');

portfolioRouter.get("/name", authorization, async (req,res) => {
    try {

         //this only gets run if authorization middleware is succesfully return. So req.user has the payload

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])

        res.json(user.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
    }
})

module.exports = portfolioRouter;