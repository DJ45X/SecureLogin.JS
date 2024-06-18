const {  getConnection } = require("./db");

async function initializeDB() {
    try {
        const connection = await getConnection();

        const tableCreationQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL
            )  
        `;

        await connection.query(tableCreationQuery);
        await connection.end();
        console.log("Database initialized");
        return true;
    } catch (err) {
        console.error("Error initializing database: ", err);
        return false;
    }
}

module.exports = { initializeDB };