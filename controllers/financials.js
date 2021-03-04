const financialsRouter = require('express').Router();
const pool = require('../utils/config').pool

financialsRouter.get('/:ticker', async (req,res) => {
    try {
        const ticker = req.params.ticker.toUpperCase();
        // const string = `SELECT * FROM coinfo WHERE "Ticker"='${ticker}'`;
        const string = `SELECT gi.name, ci.*, gi.employees, gi.sector FROM coinfo ci INNER JOIN generalcoinfo gi ON ci."Ticker" = gi.ticker WHERE ci."Ticker" = '${ticker}' ORDER BY ci."Fiscal Year" asc`
        const financials = await pool.query(string);
        console.log('success')
        res.json(financials.rows);
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = financialsRouter;