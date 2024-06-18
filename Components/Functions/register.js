const argon2 = require("argon2");
const { getConnection } = require("../Utils/db");

async function registerUser(username, password) {
    // const salt = await argon2.;
    const pepperedPassword = password + process.env.PEPPER;
    const hash = await argon2.hash(pepperedPassword, { type: argon2.argon2id});

    const connection = await getConnection();
    try {
        await connection.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash]);
        console.log("User registered successfully");
    } catch (err) {
        console.error("Error registering user: ", err);
    } finally {
        await connection.end();
    }
}

module.exports = { registerUser };