var mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
pool = {}
pool.query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        con.query(sql, values, (error, result) => {
            if (error) return reject(error);
            if (result) return resolve(result);
        });
    })
};
module.exports = pool;