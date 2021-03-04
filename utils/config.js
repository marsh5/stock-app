require('dotenv').config()
const Pool = require("pg").Pool;

const PORT = process.env.PORT

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};


const proConfig = {
    connectionString: process.ecdnv.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);


module.exports = {
    PORT,
    pool
}