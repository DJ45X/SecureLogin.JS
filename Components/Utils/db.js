const mysql = require("mysql2/promise");
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };