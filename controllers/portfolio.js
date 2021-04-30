const portfolioRouter = require("express").Router();
const pool = require('../utils/config').pool
const authorization = require('../middleware/authorization');

//get portfolio
portfolioRouter.get("/name", authorization, async (req,res) => {
    try {

         //this only gets run if authorization middleware is succesfully return. So req.user has the payload

        const user = await pool.query("SELECT u.user_name, g.ticker, g.name, g.sector FROM users u LEFT JOIN favorites f ON u.user_id = f.user_id LEFT JOIN generalcoinfo g on f.ticker = g.ticker WHERE u.user_id = $1", [req.user])

        res.json(user.rows);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
    }
})

//check for favorite entry
portfolioRouter.get("/stockcheck", authorization, async(req,res) => {
    const ticker = req.header("ticker");

    const favorite = await pool.query("SELECT * FROM favorites WHERE ticker = $1 AND user_id = $2", [ticker, req.user]);

    if(favorite.rows.length !== 0){
        return res.status(200).send({"result": true})
    }
    return res.status(200).send({"result": false})

})

//add stock to portfolio
portfolioRouter.post("/add", authorization, async (req,res) => {

    //destructure body
    const { ticker } = req.body;

    try {

        //check if favorite entry already exists
        const favorite = await pool.query("SELECT * FROM favorites WHERE ticker = $1 AND user_id = $2", [ticker, req.user]);

        if(favorite.rows.length !== 0){
            return res.status(401).json(`${ticker} was already added to your portfolio`)
        }

        //enter ticker + user into favorites table
        const newFavorite = await pool.query("INSERT INTO favorites (ticker, user_id) VALUES ($1, $2) RETURNING *", [ticker, req.user]);

        res.json(newFavorite.rows[0].ticker)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
    }
})

module.exports = portfolioRouter;